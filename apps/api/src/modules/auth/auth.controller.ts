export class AuthController {

  async register(dto:any){
    return {
      user:{
        email:dto.email,
        name:dto.name ?? null
      },
      next:'workspace-create'
    };
  }

  async login(dto:any){
    return {
      authenticated:true,
      user:dto.email
    };
  }

  async logout(){
    return {
      success:true
    };
  }
}
