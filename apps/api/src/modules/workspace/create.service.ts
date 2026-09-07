export class WorkspaceCreateService {
 async execute(input:any={}){
  return {
   module:"workspace",
   action:"create",
   input
  };
 }
}
