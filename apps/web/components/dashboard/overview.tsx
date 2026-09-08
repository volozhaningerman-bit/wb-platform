export function Overview(){
 const items=[
  'Оборот',
  'Прибыль',
  'Заказы',
  'Реклама'
 ];

 return (
  <section>
   {items.map(item=>(
    <article key={item}>{item}</article>
   ))}
  </section>
 );
}
