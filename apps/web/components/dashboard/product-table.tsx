const products=[
 ["Товар 1","500 000 ₽","120 000 ₽"],
 ["Товар 2","300 000 ₽","70 000 ₽"],
 ["Товар 3","100 000 ₽","25 000 ₽"]
];

export function ProductTable(){
 return (
  <section className="card">
   <h2>Топ товаров</h2>

   {products.map(row=>(
    <div key={row[0]} style={{
     display:"grid",
     gridTemplateColumns:"2fr 1fr 1fr",
     padding:"12px 0",
     borderBottom:"1px solid #eee"
    }}>
     <span>{row[0]}</span>
     <span>{row[1]}</span>
     <span>{row[2]}</span>
    </div>
   ))}
  </section>
 );
}
