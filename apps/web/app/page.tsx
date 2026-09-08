import Link from "next/link";

export default function Home(){
 return (
  <main style={{padding:40}}>
   <h1>WB Platform</h1>
   <p>Платформа инструментов для продавцов WB</p>
   <Link href="/dashboard">
    Открыть кабинет
   </Link>
  </main>
 );
}
