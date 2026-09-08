export function ApplicationShell({
 children
}:{
 children:React.ReactNode
}){

return (
<div className="application-shell">

<aside>
<h2>WB Platform</h2>
<nav>
<div>Dashboard</div>
<div>Analytics</div>
<div>WB</div>
<div>Plugins</div>
<div>Subscription</div>
</nav>
</aside>

<main>
{children}
</main>

</div>
)

}
