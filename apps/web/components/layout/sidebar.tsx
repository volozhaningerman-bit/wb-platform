const items=[
 'Главная',
 'Аналитика',
 'WB кабинеты',
 'Плагины',
 'Подписка',
 'Поддержка'
];

export function Sidebar(){
 return (
  <aside className="card">
   <h2>WB Platform</h2>
   {items.map(i=>
    <div key={i}>{i}</div>
   )}
  </aside>
 );
}
