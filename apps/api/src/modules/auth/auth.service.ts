export class AuthService {

 async register(data:any){
  const user = {
   id:crypto.randomUUID(),
   email:data.email,
   name:data.name
  };

  return {
   user,
   nextStep:'create-workspace'
  };
 }

 async login(){
  return {
   accessToken:'access-token',
   refreshToken:'refresh-token'
  };
 }
}
