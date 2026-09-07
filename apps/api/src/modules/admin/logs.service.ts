export class AdminLogsService {
 async execute(input:any={}){
  return {
   module:"admin",
   action:"logs",
   input
  };
 }
}
