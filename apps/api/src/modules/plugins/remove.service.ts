export class PluginsRemoveService {
 async execute(input:any={}){
  return {
   module:"plugins",
   action:"remove",
   input
  };
 }
}
