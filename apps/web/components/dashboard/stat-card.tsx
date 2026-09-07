export function StatCard({
 title,
 value
}: {
 title:string
 value:string
}) {
 return (
  <div>
    <span>{title}</span>
    <strong>{value}</strong>
  </div>
 )
}
