const metrics=[
 ["Оборот","1 240 000 ₽"],
 ["Прибыль","320 000 ₽"],
 ["Заказы","842"],
 ["Реклама","95 000 ₽"]
];

export default function Dashboard(){
 return (
  <main className="container">
   <h1>Главная</h1>

   <div className="grid metrics">
    {metrics.map(m=>(
     <div className="card" key={m[0]}>
      <small>{m[0]}</small>
      <h2>{m[1]}</h2>
     </div>
    ))}
   </div>

   <div className="card">
    <h2>Структура оборота</h2>
    <div style={{fontSize:80}}>◯</div>
    <p>Категория → Подкатегория → Товар</p>
   </div>

   <div className="card">
    <h2>Товары</h2>
    <p>Товар | Оборот | Прибыль | Маржа</p>
   </div>
  </main>
 );
}
