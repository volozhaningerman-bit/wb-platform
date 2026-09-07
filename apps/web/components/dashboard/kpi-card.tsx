export function KpiCard({
 title,
 value,
 detail
}: {
 title:string
 value:string
 detail?:string
}) {
 return (
  <div className="border rounded-xl p-5 bg-white">
    <p>{title}</p>
    <strong className="text-2xl">{value}</strong>
    {detail && <small>{detail}</small>}
  </div>
 )
}
