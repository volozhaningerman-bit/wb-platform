export class AnalyticsService {
  getCategoryTree() {
    return {
      title: "Оборот",
      type: "category-tree",
      levels: [
        "category",
        "subcategory",
        "product"
      ]
    }
  }

  getProductMatrix() {
    return {
      x: "revenue",
      y: "profit",
      size: "orders"
    }
  }
}
