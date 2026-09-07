export class AnalyticsController {
  getOverview() {
    return {
      sales: 1240000,
      advertising: 84000,
      profit: 312000
    }
  }

  getCategories() {
    return {
      name: "Все категории",
      children: []
    }
  }
}
