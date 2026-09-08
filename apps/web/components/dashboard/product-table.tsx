const rows=[
 ["Кроссовки","850 000 ₽","230 000 ₽","28%"],
 ["Чехлы","430 000 ₽","80 000 ₽","19%"],
 ["Игрушки","210 000 ₽","65 000 ₽","31%"]
];

export function ProductTable(){
 return (
  <section className="card">
   <h2>Лучшие товары</h2>

   {rows.map(r=>(
    <div key={r[0]} style={{
     display:"grid",
     gridTemplateColumns:"2fr 1fr 1fr 1fr",
     padding:"14px 0",
     borderBottom:"1px solid #eee"
    }}>
     {r.map(x=><span key={x}>{x}</span>)}
    </div>
   ))}
  </section>
 );
}
