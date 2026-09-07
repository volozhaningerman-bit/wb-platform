export function KpiCard({
 title,
 value
}:{
 title:string;
 value:string;
}){
 return (
  <div className="card">
   <small>{title}</small>
   <h2>{value}</h2>
  </div>
 );
}
