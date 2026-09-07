export function Badge({children}: {children: React.ReactNode}) {
  return (
    <span className="inline-flex px-3 py-1 rounded-full border text-sm">
      {children}
    </span>
  )
}
