export default function DashboardLayout({
 children
}:{children:React.ReactNode}){
 return (
  <div>
   <aside>
    WB Platform
    <nav>
     Dashboard
     Analytics
     Plugins
     Subscription
    </nav>
   </aside>

   <main>
    {children}
   </main>
  </div>
 )
}
