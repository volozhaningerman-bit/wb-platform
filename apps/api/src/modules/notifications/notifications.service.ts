export class NotificationsService {
  async getStatus() {
    return {
      service: "notifications",
      active: true
    };
  }
}
