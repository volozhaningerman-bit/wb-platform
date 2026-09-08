import {products} from "@/lib/dashboard-data";

export function ProductPerformanceLayer(){

return (
<section className="dashboard-card">

<h2>Эффективность товаров</h2>

<table>
<tbody>

<tr>
<th>Товар</th>
<th>Оборот</th>
<th>Прибыль</th>
<th>Маржа</th>
</tr>

{products.map(product=>(
<tr key={product.id}>
<td>{product.name}</td>
<td>{product.revenue}</td>
<td>{product.profit}</td>
<td>{product.margin}%</td>
</tr>
))}

</tbody>
</table>

</section>
)

}
