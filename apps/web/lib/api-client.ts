export class ApiClient {
 async get(path:string){
  return {
   path,
   status:"mock"
  };
 }

 async post(path:string,data:any){
  return {
   path,
   data,
   status:"mock"
  };
 }
}

export const api = new ApiClient();
