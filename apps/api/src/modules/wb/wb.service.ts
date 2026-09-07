export class WbService {
  async getStatus() {
    return {
      service: "wb",
      active: true
    };
  }
}
