export class SupportController {
  health(){
    return {
      module: "support",
      status: "ready"
    }
  }
}
