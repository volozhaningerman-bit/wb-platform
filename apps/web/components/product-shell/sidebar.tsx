const items = [
 "Главная",
 "Аналитика",
 "WB кабинеты",
 "Плагины",
 "Подписка",
 "Поддержка",
 "Настройки"
];

export function ProductSidebar(){
 return (
  <aside className="sidebar">
   <div className="brand">
    WB Platform
   </div>

   {items.map(item => (
    <div className="menu-item" key={item}>
     {item}
    </div>
   ))}
  </aside>
 );
}
