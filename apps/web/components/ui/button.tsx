export function Button({children}: {children: React.ReactNode}) {
  return (
    <button className="px-4 py-2 rounded-lg border bg-black text-white">
      {children}
    </button>
  )
}
