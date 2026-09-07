export class AdminController {
  health(){
    return {
      module: "admin",
      status: "ready"
    }
  }
}
