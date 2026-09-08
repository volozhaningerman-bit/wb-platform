import {MetricCard} from "@/components/dashboard/metric-card";
import {RevenueDonut} from "@/components/dashboard/revenue-donut";
import {ProfitMatrix} from "@/components/dashboard/profit-matrix";
import {ProductTable} from "@/components/dashboard/product-table";

export default function Dashboard(){

return (
<main className="content">

<h1>Главная</h1>

<div className="metrics">
<MetricCard title="Оборот" value="1 240 000 ₽" change="+12%"/>
<MetricCard title="Прибыль" value="320 000 ₽" change="+8%"/>
<MetricCard title="Заказы" value="842" change="+24%"/>
<MetricCard title="Реклама" value="95 000 ₽" change="-4%"/>
</div>

<div style={{marginTop:20}}>
<RevenueDonut/>
</div>

<div style={{marginTop:20}}>
<ProfitMatrix/>
</div>

<div style={{marginTop:20}}>
<ProductTable/>
</div>

</main>
)
}
