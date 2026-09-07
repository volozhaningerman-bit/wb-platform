const menu = [
 'Главная',
 'WB кабинеты',
 'Аналитика',
 'Плагины',
 'Поддержка',
 'Настройки'
]

export function Sidebar(){
 return (
  <aside>
   {menu.map(item => <div key={item}>{item}</div>)}
  </aside>
 )
}
