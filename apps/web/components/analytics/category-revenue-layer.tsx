export function CategoryRevenueLayer(){

 const categories=[
  {
   name:"Дом",
   value:"42%",
   children:[
    "Кухня",
    "Декор",
    "Хранение"
   ]
  },
  {
   name:"Красота",
   value:"28%",
   children:[
    "Уход",
    "Косметика"
   ]
  }
 ];

 return (
  <section className="analytics-card">

   <h2>
    Структура оборота
   </h2>

   <div className="donut">
    ◯
   </div>

   {categories.map(category=>(
    <div key={category.name}>
     <b>
      {category.name}
     </b>
     {" "}
     {category.value}

     {category.children.map(child=>(
      <div key={child}>
       └ {child}
      </div>
     ))}
    </div>
   ))}

  </section>
 );
}
