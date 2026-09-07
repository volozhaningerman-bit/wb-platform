export class WbController {

 connect(token:string){
  return {
   connected:Boolean(token),
   encrypted:true
  };
 }

 status(){
  return {
   connected:false,
   lastSync:null
  };
 }
}
