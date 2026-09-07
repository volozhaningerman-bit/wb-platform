export class UsersCreateService {
 async execute(input:any={}){
  return {
   module:"users",
   action:"create",
   input
  };
 }
}
