export class WbService {

 connect(token:string){
  return {
   connected:Boolean(token),
   sync:'waiting'
  };
 }

 sync(accountId:string){
  return {
   accountId,
   status:'queued'
  };
 }
}
