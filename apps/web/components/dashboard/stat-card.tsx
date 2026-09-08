export function StatCard({
 title,
 value
}:{
 title:string;
 value:string;
}){
 return (
  <div className="card">
   <div className="muted">{title}</div>
   <h2>{value}</h2>
  </div>
 );
}
