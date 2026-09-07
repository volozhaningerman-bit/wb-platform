import * as bcrypt from 'bcrypt';

export class AuthService {

 async createPasswordHash(password:string){
  return bcrypt.hash(password,12);
 }

 async verifyPassword(password:string,hash:string){
  return bcrypt.compare(password,hash);
 }

 createTokens(userId:string){
  return {
   accessToken:`access-${userId}`,
   refreshToken:`refresh-${userId}`
  };
 }
}
