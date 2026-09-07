export function MainLayout({children}:{children:React.ReactNode}){
 return (
  <div>
   <aside>
    WB Platform
    <nav>
     Dashboard
     Analytics
     Plugins
     Subscription
     Support
    </nav>
   </aside>
   <main>{children}</main>
  </div>
 );
}
