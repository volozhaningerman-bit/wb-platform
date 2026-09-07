export class AuthService {

  async createUser(data:any){
    return {
      id:'generated-user-id',
      email:data.email
    };
  }

  async createTokens(userId:string){
    return {
      accessToken:`access-${userId}`,
      refreshToken:`refresh-${userId}`
    };
  }

  async verifyToken(){
    return true;
  }
}
