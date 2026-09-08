export class DashboardService {

 getDashboard(){
  return {
   metrics:{
    revenue:0,
    profit:0,
    orders:0,
    advertising:0
   },
   charts:{
    categoryTree:true,
    profitMatrix:true
   }
  };
 }
}
