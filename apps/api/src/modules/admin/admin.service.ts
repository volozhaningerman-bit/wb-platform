export class AdminService {
  async getStatus() {
    return {
      service: "admin",
      active: true
    };
  }
}
