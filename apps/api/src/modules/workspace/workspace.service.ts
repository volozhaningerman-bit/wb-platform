export class WorkspaceService {

  createWorkspace(userId:string,name:string){
    return {
      owner:userId,
      name,
      created:true
    };
  }

  list(userId:string){
    return [
      {
        owner:userId,
        name:'Default workspace'
      }
    ];
  }
}
