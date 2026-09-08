export function DashboardModule(){

const cards=[
["Оборот","1 240 000 ₽"],
["Прибыль","320 000 ₽"],
["Заказы","842"],
["Реклама","95 000 ₽"]
];

return (
<section>

<h1>Главная</h1>

<div className="grid">
{cards.map(card=>
<div className="card" key={card[0]}>
<small>{card[0]}</small>
<h2>{card[1]}</h2>
</div>
)}
</div>

</section>
)

}
