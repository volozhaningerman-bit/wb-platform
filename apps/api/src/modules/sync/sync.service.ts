export class SyncService {

 async run(workspaceId:string){
  return {
   workspaceId,
   status:"queued"
  };
 }
}
