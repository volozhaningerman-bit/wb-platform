export class AnalyticsProductsService {
 async execute(input:any={}){
  return {
   module:"analytics",
   action:"products",
   input
  };
 }
}
