export class PluginsInstallService {
 async execute(input:any={}){
  return {
   module:"plugins",
   action:"install",
   input
  };
 }
}
