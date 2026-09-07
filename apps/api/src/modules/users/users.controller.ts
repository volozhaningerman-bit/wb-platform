export class UsersController {
  health(){
    return {
      module: "users",
      status: "ready"
    }
  }
}
