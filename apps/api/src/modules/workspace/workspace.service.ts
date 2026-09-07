export class WorkspaceService {

 create(userId:string,name:string){
  return {
   owner:userId,
   name,
   created:true
  };
 }
}
