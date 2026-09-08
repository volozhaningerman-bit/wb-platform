import Link from "next/link";

export default function Home(){
 return (
  <main className="container">
   <div className="card">
    <h1>WB Platform</h1>
    <p>Единый кабинет инструментов для продавцов Wildberries</p>
    <Link href="/login">Войти</Link>
   </div>
  </main>
 );
}
