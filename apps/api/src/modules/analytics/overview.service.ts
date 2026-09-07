export class AnalyticsOverviewService {
 async execute(input:any={}){
  return {
   module:"analytics",
   action:"overview",
   input
  };
 }
}
