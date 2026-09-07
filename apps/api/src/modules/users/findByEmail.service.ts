export class UsersFindbyemailService {
 async execute(input:any={}){
  return {
   module:"users",
   action:"findByEmail",
   input
  };
 }
}
