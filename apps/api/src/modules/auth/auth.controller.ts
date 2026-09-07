import { apiResponse } from '../../common/http/api-response';

export class AuthController {

 async register(body:any){
  return apiResponse({
   email:body.email,
   next:'create-workspace'
  });
 }

 async login(body:any){
  return apiResponse({
   email:body.email,
   authenticated:true
  });
 }
}
