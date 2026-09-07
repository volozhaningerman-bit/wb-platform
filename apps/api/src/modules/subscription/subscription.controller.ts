export class SubscriptionController {
  health(){
    return {
      module: "subscription",
      status: "ready"
    }
  }
}
