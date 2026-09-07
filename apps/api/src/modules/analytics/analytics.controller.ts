export class AnalyticsController {
  health(){
    return {
      module: "analytics",
      status: "ready"
    }
  }
}
