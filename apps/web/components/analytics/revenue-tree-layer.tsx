import {categoryTree} from "@/lib/dashboard-data";

function Node({node}:any){
return (
<div style={{marginLeft:20}}>
<b>{node.name}</b>
<span> — {node.revenue} ₽</span>

{node.children?.map((child:any)=>(
<Node key={child.id} node={child}/>
))}

</div>
)
}

export function RevenueTreeLayer(){
return (
<section className="dashboard-card">
<h2>Структура оборота</h2>
<Node node={categoryTree}/>
</section>
)
}
