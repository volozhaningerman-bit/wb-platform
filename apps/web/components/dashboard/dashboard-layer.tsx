import {metrics} from "@/lib/dashboard-data";

export function DashboardLayer(){

return (
<section>

<header>
<h1>Главная</h1>
<p>
Центр управления продажами Wildberries
</p>
</header>

<div className="metric-grid">

{metrics.map(metric=>(
<article className="dashboard-card" key={metric.title}>
<span>{metric.title}</span>
<h2>{metric.value}</h2>
<small>{metric.change}</small>
</article>
))}

</div>

</section>
)

}
