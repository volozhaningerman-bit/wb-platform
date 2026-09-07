export function DashboardOverview(){

 const cards=[
  ['Продажи','0 ₽'],
  ['Прибыль','0 ₽'],
  ['Реклама','0 ₽']
 ];

 return (
  <div>
   {cards.map(card=>(
    <div key={card[0]}>
     <span>{card[0]}</span>
     <strong>{card[1]}</strong>
    </div>
   ))}
  </div>
 );
}
