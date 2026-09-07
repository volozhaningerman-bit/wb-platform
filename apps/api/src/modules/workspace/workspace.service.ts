export class WorkspaceService {

 create(name:string){
  return {
   id:crypto.randomUUID(),
   name
  };
 }
}
