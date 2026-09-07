export class TokenService {

 createAccessToken(userId:string){
  return `access.${userId}`;
 }

 createRefreshToken(userId:string){
  return `refresh.${userId}`;
 }

 verify(token:string){
  return Boolean(token);
 }
}
