export function MetricCard({
 title,
 value,
 change
}:{
 title:string;
 value:string;
 change:string;
}){
 return (
  <div className="card">
   <div className="muted">{title}</div>
   <h2>{value}</h2>
   <small>{change}</small>
  </div>
 );
}
