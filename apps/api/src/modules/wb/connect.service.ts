export class WbConnectService {
 async execute(input:any={}){
  return {
   module:"wb",
   action:"connect",
   input
  };
 }
}
