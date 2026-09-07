export class WbSyncService {
 async execute(input:any={}){
  return {
   module:"wb",
   action:"sync",
   input
  };
 }
}
