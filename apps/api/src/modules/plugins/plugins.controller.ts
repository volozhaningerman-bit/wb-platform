export class PluginsController {
  health(){
    return {
      module: "plugins",
      status: "ready"
    }
  }
}
