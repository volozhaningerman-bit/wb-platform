export class AdminUsersService {
 async execute(input:any={}){
  return {
   module:"admin",
   action:"users",
   input
  };
 }
}
