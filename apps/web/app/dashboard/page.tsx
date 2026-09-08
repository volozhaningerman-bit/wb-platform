import {Sidebar} from "@/components/layout/sidebar";
import {Header} from "@/components/layout/header";
import {KPI} from "@/components/dashboard/kpi";
import {CategoryChart} from "@/components/dashboard/category-chart";
import {ProfitChart} from "@/components/dashboard/profit-chart";

export default function Dashboard(){
 return (
  <main style={{padding:20}}>
   <Header/>
   <div style={{
    display:"grid",
    gridTemplateColumns:"240px 1fr",
    gap:20,
    marginTop:20
   }}>
    <Sidebar/>

    <section>
     <h1>Главная</h1>

     <div className="grid">
      <KPI title="Оборот" value="0 ₽"/>
      <KPI title="Прибыль" value="0 ₽"/>
      <KPI title="Заказы" value="0"/>
      <KPI title="Реклама" value="0 ₽"/>
     </div>

     <CategoryChart/>
     <ProfitChart/>
    </section>
   </div>
  </main>
 );
}
