export class AnalyticsCategoriesService {
 async execute(input:any={}){
  return {
   module:"analytics",
   action:"categories",
   input
  };
 }
}
