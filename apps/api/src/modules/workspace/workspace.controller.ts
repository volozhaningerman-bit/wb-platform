export class WorkspaceController {
  health(){
    return {
      module: "workspace",
      status: "ready"
    }
  }
}
