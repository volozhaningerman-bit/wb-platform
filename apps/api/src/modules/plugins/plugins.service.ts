export class PluginsService {
 async status(){
  return {
   module: "plugins",
   ready: true
  }
 }
}
