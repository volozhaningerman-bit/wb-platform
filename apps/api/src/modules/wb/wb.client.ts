export class WbClient {
 async testConnection(token:string){
  return {
   valid:Boolean(token),
   status:'checked'
  };
 }

 async sync(){
  return {
   status:'queued'
  };
 }
}
