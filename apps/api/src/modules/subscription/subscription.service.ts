export class SubscriptionService {
  async getStatus() {
    return {
      service: "subscription",
      active: true
    };
  }
}
