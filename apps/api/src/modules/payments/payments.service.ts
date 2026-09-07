export class PaymentsService {
  async getStatus() {
    return {
      service: "payments",
      active: true
    };
  }
}
