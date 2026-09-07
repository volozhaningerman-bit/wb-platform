import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Sidebar />
      <div>
        <Header />
        {children}
      </div>
    </div>
  )
}
