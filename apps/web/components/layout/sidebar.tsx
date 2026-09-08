const menu=[
 ["Главная","/dashboard"],
 ["Аналитика","/analytics"],
 ["WB кабинеты","/wb"],
 ["Плагины","/plugins"],
 ["Подписка","/subscription"],
 ["Поддержка","/support"]
];

export function Sidebar(){
 return (
  <aside className="card">
   <h2>WB Platform</h2>
   {menu.map(([name,url])=>(
    <div key={url}>
     <a href={url}>{name}</a>
    </div>
   ))}
  </aside>
 );
}
