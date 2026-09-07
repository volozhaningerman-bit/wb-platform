export class SupportService {
  async getStatus() {
    return {
      service: "support",
      active: true
    };
  }
}
