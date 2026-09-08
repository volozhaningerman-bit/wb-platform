import {Sidebar} from "@/components/layout/sidebar";
import {Topbar} from "@/components/layout/topbar";
import {StatCard} from "@/components/dashboard/stat-card";
import {RevenueChart} from "@/components/dashboard/revenue-chart";
import {ProductTable} from "@/components/dashboard/product-table";

export default function Dashboard(){

return (
<div className="page">

<Sidebar/>

<section className="content">

<Topbar/>

<h1>Главная</h1>

<div className="grid">
<StatCard title="Оборот" value="1 240 000 ₽"/>
<StatCard title="Прибыль" value="320 000 ₽"/>
<StatCard title="Заказы" value="842"/>
<StatCard title="Реклама" value="95 000 ₽"/>
</div>

<div style={{marginTop:24}}>
<RevenueChart/>
</div>

<div style={{marginTop:24}}>
<ProductTable/>
</div>

</section>

</div>
)
}
