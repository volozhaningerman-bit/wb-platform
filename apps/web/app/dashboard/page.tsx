import {DashboardLayer} from "@/components/dashboard/dashboard-layer";
import {RevenueTreeLayer} from "@/components/analytics/revenue-tree-layer";
import {ProductPerformanceLayer} from "@/components/analytics/product-performance-layer";
import {WbLayer} from "@/components/modules/wb-layer";
import {PluginsLayer} from "@/components/modules/plugins-layer";
import {SubscriptionLayer} from "@/components/modules/subscription-layer";
import {SupportLayer} from "@/components/modules/support-layer";

export default function Dashboard(){

return (
<main>

<DashboardLayer/>

<RevenueTreeLayer/>

<ProductPerformanceLayer/>

<WbLayer/>

<PluginsLayer/>

<SubscriptionLayer/>

<SupportLayer/>

</main>
)

}
