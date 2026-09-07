const items = [
 'Главная',
 'WB кабинеты',
 'Аналитика',
 'Плагины',
 'Поддержка',
 'Настройки'
]

export function Sidebar() {
 return (
  <aside>
   {items.map(item => (
    <div key={item}>{item}</div>
   ))}
  </aside>
 )
}
