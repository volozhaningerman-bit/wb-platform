export class AuthService {

 async hashPassword(password:string){
  return `hash:${password}`;
 }

 async createSession(){
  return {
   accessToken:"jwt",
   refreshToken:"refresh"
  };
 }
}
