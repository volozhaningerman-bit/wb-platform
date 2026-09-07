import * as bcrypt from 'bcrypt';

export class AuthService {

  async hashPassword(password:string){
    return bcrypt.hash(password, 12);
  }

  async comparePassword(password:string, hash:string){
    return bcrypt.compare(password, hash);
  }

  createSession(userId:string){
    return {
      userId,
      accessToken:'generated-token',
      refreshToken:'generated-refresh-token'
    };
  }
}
