import "./globals.css";

export const metadata = {
 title:"WB Platform",
 description:"Seller tools dashboard"
};

export default function Layout({
 children
}:{
 children:React.ReactNode
}){
 return (
  <html lang="ru">
   <body>
    {children}
   </body>
  </html>
 );
}
