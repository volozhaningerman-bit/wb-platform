import {plugins} from "@/lib/dashboard-data";

export function PluginsLayer(){

return (
<section className="dashboard-card">

<h2>Плагины</h2>

{plugins.map(plugin=>(
<div key={plugin.id}>
<b>{plugin.name}</b>
<p>{plugin.description}</p>
</div>
))}

</section>
)

}
