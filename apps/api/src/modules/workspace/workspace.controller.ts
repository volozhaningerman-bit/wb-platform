export class WorkspaceController {

  create(dto:any){
    return {
      id:'workspace-id',
      name:dto.name
    };
  }

  current(){
    return {
      id:'workspace-id',
      name:'Default workspace'
    };
  }
}
