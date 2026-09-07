export class WbService {

  connect(token:string){
    return {
      connected:true,
      tokenStored:true,
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
