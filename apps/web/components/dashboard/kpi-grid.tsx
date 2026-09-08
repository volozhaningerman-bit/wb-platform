const items=[
["Оборот","1 240 000 ₽"],
["Прибыль","320 000 ₽"],
["Заказы","842"],
["Реклама","95 000 ₽"]
];

export function KpiGrid(){
 return <div>
  {items.map(x=><div key={x[0]}>
   <small>{x[0]}</small>
   <h2>{x[1]}</h2>
  </div>)}
 </div>
}
