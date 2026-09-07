export class WorkspaceMembersService {
 async execute(input:any={}){
  return {
   module:"workspace",
   action:"members",
   input
  };
 }
}
