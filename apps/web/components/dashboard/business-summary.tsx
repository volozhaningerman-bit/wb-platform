export function BusinessSummary(){

 const items=[
  ['Оборот','0 ₽'],
  ['Прибыль','0 ₽'],
  ['Реклама','0 ₽']
 ];

 return (
  <section>
   {items.map(item=>(
    <div key={item[0]}>
      <span>{item[0]}</span>
      <strong>{item[1]}</strong>
    </div>
   ))}
  </section>
 );
}
