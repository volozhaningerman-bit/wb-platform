type Metric = {
 title:string;
 value:string;
 trend:string;
};

const metrics:Metric[]=[
 {
  title:"Оборот",
  value:"1 240 000 ₽",
  trend:"+12%"
 },
 {
  title:"Прибыль",
  value:"320 000 ₽",
  trend:"+8%"
 },
 {
  title:"Заказы",
  value:"842",
  trend:"+24%"
 },
 {
  title:"Реклама",
  value:"95 000 ₽",
  trend:"-4%"
 }
];

export function DashboardLayer(){

 return (
  <section className="dashboard-layer">

   <header>
    <h1>Главная</h1>
    <p>
     Контроль бизнеса на Wildberries
    </p>
   </header>

   <div className="metric-grid">
    {metrics.map(metric=>(
     <article className="metric-card" key={metric.title}>
      <span>{metric.title}</span>
      <strong>{metric.value}</strong>
      <small>{metric.trend}</small>
     </article>
    ))}
   </div>

  </section>
 );
}
