export class UsersService {
  async getStatus() {
    return {
      service: "users",
      active: true
    };
  }
}
