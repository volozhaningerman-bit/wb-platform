export class AuthService {
  async getStatus() {
    return {
      service: "auth",
      active: true
    };
  }
}
