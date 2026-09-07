export class WorkspaceController {

 create(body:any){
  return {
   workspace:{
    name:body.name
   }
  };
 }
}
