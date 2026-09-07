export class WbController {
  health(){
    return {
      module: "wb",
      status: "ready"
    }
  }
}
