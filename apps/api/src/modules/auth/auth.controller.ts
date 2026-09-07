export class AuthController {

  async register(body:any){
    return {
      success:true,
      message:'User registration flow ready',
      data:{
        email:body.email
      }
    };
  }

  async login(body:any){
    return {
      success:true,
      message:'Login flow ready',
      email:body.email
    };
  }
}
