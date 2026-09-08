import {PeriodFilter} from "@/components/dashboard/period-filter";
import {SalesChart} from "@/components/dashboard/sales-chart";
import {CategoryDrilldown} from "@/components/dashboard/category-drilldown";
import {StatusWidget} from "@/components/dashboard/status-widget";

export default function Dashboard(){

return (
<main style={{padding:32}}>

<h1 className="title">
Главная
</h1>

<PeriodFilter/>

<div className="grid">

<section className="card">
<h2>Оборот</h2>
<h1>1 240 000 ₽</h1>
</section>

<section className="card">
<h2>Прибыль</h2>
<h1>320 000 ₽</h1>
</section>

</div>

<SalesChart/>

<CategoryDrilldown/>

<StatusWidget/>

</main>
)
}
