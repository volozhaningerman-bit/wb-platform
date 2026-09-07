export class AdminStatsService {
 async execute(input:any={}){
  return {
   module:"admin",
   action:"stats",
   input
  };
 }
}
