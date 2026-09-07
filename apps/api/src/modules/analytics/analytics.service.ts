export class AnalyticsService {

 getOverview(){
  return {
   revenue:0,
   profit:0,
   advertising:0
  };
 }

 getCategoryTree(){
  return {
   name:'root',
   children:[]
  };
 }

 getProductMatrix(){
  return {
   axis:{
    x:'revenue',
    y:'profit'
   }
  };
 }
}
