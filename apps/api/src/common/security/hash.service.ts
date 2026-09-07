import * as bcrypt from 'bcrypt';

export class HashService {
 async hash(value:string){
  return bcrypt.hash(value,12);
 }

 async compare(value:string,hash:string){
  return bcrypt.compare(value,hash);
 }
}
