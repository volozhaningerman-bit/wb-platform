import MetricCard from "./metric-card";

export default function ManagementDashboard() {
  return (
    <div className="dashboard-grid">
      <MetricCard title="Оборот" value="1 240 000 ₽" />
      <MetricCard title="Прибыль" value="320 000 ₽" />
      <MetricCard title="Заказы" value="842" />
      <MetricCard title="Реклама" value="95 000 ₽" />
    </div>
  );
}
