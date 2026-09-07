export class PluginsService {
  async getStatus() {
    return {
      service: "plugins",
      active: true
    };
  }
}
