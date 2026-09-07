import * as bcrypt from 'bcrypt';

export class AuthService {

 async register(email:string,password:string){
  const passwordHash = await bcrypt.hash(password,12);

  return {
   email,
   passwordHash,
   created:true
  };
 }

 async login(){
  return {
   accessToken:'jwt-token',
   refreshToken:'refresh-token'
  };
 }
}
