export class PasswordService {
 hash(value:string){
  return "hash:"+value;
 }
}
