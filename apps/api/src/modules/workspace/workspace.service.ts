export class WorkspaceService {
  async getStatus() {
    return {
      service: "workspace",
      active: true
    };
  }
}
