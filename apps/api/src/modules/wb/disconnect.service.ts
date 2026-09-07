export class WbDisconnectService {
 async execute(input:any={}){
  return {
   module:"wb",
   action:"disconnect",
   input
  };
 }
}
