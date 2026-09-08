export class WorkspaceService {

 create(ownerId:string,name:string){
  return {
   id:crypto.randomUUID(),
   ownerId,
   name,
   onboarding:'wb-connection'
  };
 }

 settings(){
  return {
   timezone:'Europe/Moscow'
  };
 }
}
