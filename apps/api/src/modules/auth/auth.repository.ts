export class AuthRepository {

 async findUserByEmail(email:string){
  return {
   email
  };
 }

 async createUser(data:any){
  return {
   id:crypto.randomUUID(),
   ...data
  };
 }
}
