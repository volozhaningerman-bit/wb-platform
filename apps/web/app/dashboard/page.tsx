import {KpiCard} from '@/components/dashboard/kpi-card';
import {CategoryDonut} from '@/components/dashboard/category-donut';
import {ProductMatrix} from '@/components/dashboard/product-matrix';
import {PluginCard} from '@/components/dashboard/plugin-card';

export default function Dashboard(){
 return (
  <main>
   <h1>Главная</h1>

   <KpiCard title="Оборот" value="0 ₽"/>
   <KpiCard title="Прибыль" value="0 ₽"/>
   <KpiCard title="Реклама" value="0 ₽"/>

   <CategoryDonut/>
   <ProductMatrix/>
   <PluginCard/>
  </main>
 );
}
