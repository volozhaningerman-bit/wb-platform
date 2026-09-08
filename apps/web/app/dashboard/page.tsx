import {DashboardModule} from "@/components/dashboard/dashboard-module";
import {AnalyticsModule} from "@/components/analytics/analytics-module";
import {WbModule} from "@/components/wb/wb-module";
import {PluginModule} from "@/components/plugins/plugin-module";
import {SubscriptionModule} from "@/components/subscription/subscription-module";

export default function Dashboard(){

return (
<>
<DashboardModule/>
<AnalyticsModule/>
<WbModule/>
<PluginModule/>
<SubscriptionModule/>
</>
)

}
