export class AuthService {

 async register(data:any){
  return {
   email:data.email,
   created:true
  }
 }

 async login(){
  return {
   token:'session-token'
  }
 }
}
