import {DashboardLayer} from "@/components/dashboard/dashboard-layer";
import {CategoryRevenueLayer} from "@/components/analytics/category-revenue-layer";
import {ProductProfitLayer} from "@/components/analytics/product-profit-layer";
import {PluginLayer} from "@/components/modules/plugin-layer";
import {WbAccountLayer} from "@/components/modules/wb-account-layer";

export default function Dashboard(){

 return (
  <main>

   <DashboardLayer/>

   <CategoryRevenueLayer/>

   <ProductProfitLayer/>

   <WbAccountLayer/>

   <PluginLayer/>

  </main>
 );
}
