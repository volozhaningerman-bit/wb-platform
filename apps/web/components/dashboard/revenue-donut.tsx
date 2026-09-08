const parts=[
 ["Электроника","42%"],
 ["Дом","28%"],
 ["Красота","18%"],
 ["Другое","12%"]
];

export function RevenueDonut(){
 return (
  <section className="card">
   <h2>Доля категорий в обороте</h2>

   <div style={{
    display:"flex",
    gap:30,
    alignItems:"center"
   }}>
    <div style={{
     width:180,
     height:180,
     borderRadius:"50%",
     background:"conic-gradient(#2563eb 0 42%,#12b76a 42% 70%,#f79009 70% 88%,#ddd 88%)"
    }}/>

    <div>
     {parts.map(p=>(
      <div key={p[0]}>
       {p[0]} — {p[1]}
      </div>
     ))}
    </div>
   </div>

   <p className="muted">
    Нажатие на категорию открывает подкатегории
   </p>
  </section>
 );
}
