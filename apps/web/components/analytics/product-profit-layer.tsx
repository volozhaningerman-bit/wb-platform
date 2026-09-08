export function ProductProfitLayer(){

 const rows=[
  ["Товар А","500 000 ₽","120 000 ₽"],
  ["Товар Б","300 000 ₽","90 000 ₽"],
  ["Товар В","100 000 ₽","35 000 ₽"]
 ];

 return (
  <section className="analytics-card">

   <h2>
    Эффективность товаров
   </h2>

   {rows.map(row=>(
    <div className="product-row" key={row[0]}>
     <span>{row[0]}</span>
     <span>{row[1]}</span>
     <span>{row[2]}</span>
    </div>
   ))}

  </section>
 );
}
