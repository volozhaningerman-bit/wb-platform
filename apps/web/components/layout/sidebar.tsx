const navigation = [
  'Главная',
  'Аналитика',
  'WB кабинеты',
  'Плагины',
  'Поддержка',
  'Настройки'
]

export function Sidebar() {
 return (
  <aside className="border-r min-h-screen p-4">
   <h2>WB Platform</h2>
   {navigation.map(item => (
    <div key={item}>{item}</div>
   ))}
  </aside>
 )
}
