export class UsersUpdateService {
 async execute(input:any={}){
  return {
   module:"users",
   action:"update",
   input
  };
 }
}
