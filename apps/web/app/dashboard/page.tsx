import {DashboardOverview} from '@/components/dashboard/dashboard-overview';
import {AnalyticsPanel} from '@/components/dashboard/analytics-panel';

export default function DashboardPage(){
 return (
  <main>
   <h1>WB Platform</h1>
   <DashboardOverview/>
   <AnalyticsPanel/>
  </main>
 );
}
