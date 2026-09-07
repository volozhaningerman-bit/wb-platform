export class WbTokenService {
  encrypt(token:string){
    return `encrypted:${token}`;
  }

  validate(){
    return true;
  }
}
