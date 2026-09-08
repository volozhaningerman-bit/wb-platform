export default function Plugins(){

const plugins=[
["Контроль рекламы","ACTIVE"],
["Мониторинг цен","AVAILABLE"],
["Анализ конкурентов","AVAILABLE"]
];

return (
<main style={{padding:32}}>
<h1 className="title">
Плагины
</h1>

{plugins.map(p=>(
<section className="card" key={p[0]}>
<h2>{p[0]}</h2>
<p>{p[1]}</p>
</section>
))}

</main>
)
}
