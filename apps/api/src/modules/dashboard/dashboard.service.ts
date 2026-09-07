export class DashboardService {

 getMain(){
  return {
   metrics:{
    revenue:0,
    profit:0,
    advertising:0
   },
   charts:{
    categories:true,
    products:true
   }
  };
 }
}
