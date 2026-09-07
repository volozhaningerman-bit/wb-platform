export function AppShell({
 children
}:{children:React.ReactNode}){

 return (
  <div>
    <header>
      WB Platform
    </header>

    <main>
      {children}
    </main>
  </div>
 );
}
