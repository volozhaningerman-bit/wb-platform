export function Card({
 children
}: {
 children: React.ReactNode
}) {
 return (
  <section className="rounded-2xl border bg-white p-5 shadow-sm">
    {children}
  </section>
 )
}
