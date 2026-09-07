export function BusinessOverview() {
 const stats = [
  ['Продажи', '1 240 000 ₽'],
  ['Реклама', '84 000 ₽'],
  ['Прибыль', '312 000 ₽']
 ]

 return (
  <div>
   {stats.map(([title,value]) => (
    <div key={title}>
     <span>{title}</span>
     <strong>{value}</strong>
    </div>
   ))}
  </div>
 )
}
