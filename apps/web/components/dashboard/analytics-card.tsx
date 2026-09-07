export function AnalyticsCard({
 title
}: {
 title:string
}) {
 return (
  <section className="border rounded-xl p-6 bg-white">
    <h3>{title}</h3>
    <div>
      Здесь будет интерактивный график.
    </div>
  </section>
 )
}
