export class WorkspaceSettingsService {
 async execute(input:any={}){
  return {
   module:"workspace",
   action:"settings",
   input
  };
 }
}
