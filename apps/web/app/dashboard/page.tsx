import {KpiGrid} from "@/components/dashboard/kpi-grid";
import {CategoryChart} from "@/components/dashboard/category-chart";
import {ProductTable} from "@/components/dashboard/product-table";

export default function Dashboard(){
 return <>
  <h1>WB Platform</h1>
  <KpiGrid/>
  <CategoryChart/>
  <ProductTable/>
 </>
}
