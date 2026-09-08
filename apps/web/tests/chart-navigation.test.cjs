const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const Module=require('node:module');
const esbuild=require('esbuild');
const {JSDOM}=require('jsdom');
const dom=new JSDOM('<!doctype html><html><body></body></html>',{url:'http://localhost'});
global.window=dom.window;global.document=dom.window.document;
global.HTMLElement=dom.window.HTMLElement;
global.IS_REACT_ACT_ENVIRONMENT=true;
dom.window.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
dom.window.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};
const React=require('react');
const {createRoot}=require('react-dom/client');
const {act}=React;
function load(relative){
 const filename=path.resolve(__dirname,relative);
 const mod=new Module(filename,module);mod.filename=filename;mod.paths=Module._nodeModulePaths(path.dirname(filename));
 const original=mod.require.bind(mod);
 mod.require=(name)=>name==='@/lib/management-analytics'?load('../lib/management-analytics.ts'):name==='recharts'?new Proxy({},{get:()=>()=>null}):original(name);
 mod._compile(esbuild.transformSync(fs.readFileSync(filename,'utf8'),{loader:filename.endsWith('.tsx')?'tsx':'ts',format:'cjs',jsx:'automatic',target:'es2022'}).code,filename);
 return mod.exports;
}
// Chart painting is stubbed; tests exercise the real dashboard state and buttons.
const Dashboard=load('../components/management-dashboard.tsx').default;
function click(scope,label){const button=[...scope.querySelectorAll('button')].find(b=>b.textContent.trim()===label);assert.ok(button,`Missing button: ${label}`);act(()=>button.click());}
function choose(scope,label){const button=[...scope.querySelectorAll('.chart-legend button')].find(b=>b.querySelector('.legend-name')?.firstChild.textContent===label);assert.ok(button,`Missing legend: ${label}`);act(()=>button.click());}
function mount(){const container=document.createElement('div');document.body.append(container);const root=createRoot(container);act(()=>root.render(React.createElement(Dashboard)));return {container,dispose(){act(()=>root.unmount());container.remove();}};}
test('category return controls remain visible and recover each level after closing a product',()=>{
 const {container,dispose}=mount();try{
  const chart=container.querySelectorAll('.distribution')[0];
  assert.ok(chart.querySelector('.chart-navigation'),'Navigation must appear above the circle');
  choose(chart,'Дом');choose(chart,'Текстиль');choose(chart,'Комплект полотенец');
  const dialog=container.querySelector('dialog[open]');assert.ok(dialog);
  click(dialog,'Вернуться к просмотру');assert.equal(container.querySelector('dialog'),null);
  assert.match(chart.querySelector('.breadcrumbs').textContent,/Текстиль/);
  click(chart.querySelector('.chart-navigation'),'Назад');assert.doesNotMatch(chart.querySelector('.breadcrumbs').textContent,/Текстиль/);
  click(chart.querySelector('.chart-navigation'),'Все категории');assert.equal(chart.querySelectorAll('.breadcrumbs > span').length,0);
  assert.ok(chart.querySelector('.chart-navigation button').disabled);
 }finally{dispose();}
});
test('manager drilldown returns without resetting the independent category chart',()=>{
 const {container,dispose}=mount();try{
  const [categories,managers]=container.querySelectorAll('.distribution');
  choose(categories,'Дом');choose(managers,'Елена Ким');choose(managers,'Дом');
  click(managers.querySelector('.chart-navigation'),'Назад');
  assert.equal(managers.querySelectorAll('.breadcrumbs > span').length,1);
  click(managers.querySelector('.chart-navigation'),'Все менеджеры');
  assert.equal(managers.querySelectorAll('.breadcrumbs > span').length,0);
  assert.match(categories.querySelector('.breadcrumbs').textContent,/Дом/);
 }finally{dispose();}
});
