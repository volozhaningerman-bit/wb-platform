export default function Dashboard(){

 const cards=[
  ['Оборот','0 ₽'],
  ['Прибыль','0 ₽'],
  ['Реклама','0 ₽']
 ];

 return (
  <main>
   <h1>Главная</h1>

   {cards.map(c=>(
    <section key={c[0]}>
     <span>{c[0]}</span>
     <strong>{c[1]}</strong>
    </section>
   ))}
  </main>
 );
}
