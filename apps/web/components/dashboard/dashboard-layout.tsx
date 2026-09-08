import Sidebar from '../layout/sidebar';
import Header from '../layout/header';

export function DashboardLayout({
 children
}:{
 children:React.ReactNode
}){
 return (
  <div>
   <Header/>
   <Sidebar/>
   {children}
  </div>
 );
}
