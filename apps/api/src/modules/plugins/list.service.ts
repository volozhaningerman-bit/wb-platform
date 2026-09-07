export class PluginsListService {
 async execute(input:any={}){
  return {
   module:"plugins",
   action:"list",
   input
  };
 }
}
