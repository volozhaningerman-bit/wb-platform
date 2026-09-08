const items=[
"Главная",
"Аналитика",
"WB кабинеты",
"Плагины",
"Подписка",
"Поддержка"
];

export function Sidebar(){
 return (
  <aside className="sidebar">
   <h2>WB Platform</h2>

   {items.map(item=>(
    <div key={item} style={{
     padding:"12px 0"
    }}>
     {item}
    </div>
   ))}
  </aside>
 );
}
