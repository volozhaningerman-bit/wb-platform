export class WbService {

 connect(apiToken:string){
  return {
   connected:Boolean(apiToken),
   syncStatus:'pending'
  };
 }

 disconnect(){
  return {
   connected:false
  };
 }
}
