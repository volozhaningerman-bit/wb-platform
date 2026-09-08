export type SalesRow = {
  date: string;
  account: string;
  manager: string;
  category: string;
  subcategory: string;
  productId: string;
  name: string;
  revenue: number;
  ads: number;
  cost: number;
  fees: number;
  units: number;
  stock: number;
  plan: number;
};
export type Filters = {
  from: string;
  to: string;
  account: string;
  manager: string;
};
export type GroupKey = "category" | "subcategory" | "manager" | "productId";
export const managers: Record<string, string> = {
  anna: "Анна Смирнова",
  max: "Максим Волков",
  elena: "Елена Ким",
  "": "Без менеджера",
};
export const accounts: Record<string, string> = {
  main: "Основной магазин",
  home: "Дом и уют",
};
export const DEMO_END = "2026-09-07";
export function dateOffset(date: string, days: number) {
  const d = new Date(date + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
export function selectRows(rows: SalesRow[], f: Filters) {
  return rows.filter(
    (r) =>
      r.date >= f.from &&
      r.date <= f.to &&
      (f.account === "all" || r.account === f.account) &&
      (f.manager === "all" || r.manager === f.manager),
  );
}
export function summarize(rows: SalesRow[]) {
  const sum = rows.reduce(
    (a, r) => ({
      revenue: a.revenue + r.revenue,
      ads: a.ads + r.ads,
      cost: a.cost + r.cost,
      fees: a.fees + r.fees,
      units: a.units + r.units,
      plan: a.plan + r.plan,
    }),
    { revenue: 0, ads: 0, cost: 0, fees: 0, units: 0, plan: 0 },
  );
  const profit = sum.revenue - sum.ads - sum.cost - sum.fees;
  return {
    ...sum,
    profit,
    drr: sum.revenue ? (sum.ads / sum.revenue) * 100 : null,
    margin: sum.revenue ? (profit / sum.revenue) * 100 : null,
  };
}
export function percentChange(current: number, previous: number) {
  return previous > 0 ? ((current - previous) / previous) * 100 : null;
}
export function groupRows(rows: SalesRow[], key: GroupKey) {
  const groups = new Map<string, SalesRow[]>();
  for (const r of rows) {
    const k = r[key];
    const bucket = groups.get(k);
    if (bucket) bucket.push(r);
    else groups.set(k, [r]);
  }
  return [...groups]
    .map(([keyValue, items]) => ({
      key: keyValue,
      label:
        key === "manager"
          ? managers[keyValue] || keyValue
          : key === "productId"
            ? items[0].name
            : keyValue,
      rows: items,
      ...summarize(items),
    }))
    .sort((a, b) => b.revenue - a.revenue || a.key.localeCompare(b.key));
}
export type Signal = {
  id: string;
  kind: "ads" | "stock" | "plan";
  title: string;
  detail: string;
  productId: string;
  name: string;
  manager: string;
  severity: "high" | "medium";
};
export function getSignals(rows: SalesRow[], days: number): Signal[] {
  const result: Signal[] = [];
  for (const product of groupRows(rows, "productId")) {
    const latest = [...product.rows].sort((a, b) =>
      b.date.localeCompare(a.date),
    )[0];
    const base = {
      productId: product.key,
      name: product.label,
      manager: latest.manager,
    };
    if (product.ads > 0 && (product.drr === null || product.drr > 15))
      result.push({
        ...base,
        id: product.key + "-ads",
        kind: "ads",
        severity: "high",
        title: "Высокая доля рекламных расходов",
        detail:
          product.drr === null
            ? "Есть рекламные расходы, продаж за период нет."
            : `ДРР ${product.drr.toFixed(1)}% при контрольном пороге 15%. Проверьте кампании и конверсию. Ответственный за товар не обязательно является автором изменений.`,
      });
    const coverage =
      product.units > 0
        ? latest.stock / (product.units / Math.max(days, 1))
        : Infinity;
    if (coverage < 7)
      result.push({
        ...base,
        id: product.key + "-stock",
        kind: "stock",
        severity: "high",
        title: "Заканчивается запас товара",
        detail: `Остаток ${latest.stock} шт. Прогноз на ${coverage.toFixed(1)} дня по средней скорости продаж выбранного периода. Проверьте поставки; это прогноз, а не установленная ошибка сотрудника.`,
      });
    if (product.plan > 0 && product.revenue / product.plan < 0.8)
      result.push({
        ...base,
        id: product.key + "-plan",
        kind: "plan",
        severity: "medium",
        title: "Продажи ниже плана",
        detail: `Выполнено ${((product.revenue / product.plan) * 100).toFixed(0)}% плана выбранного периода. Проверьте спрос, доступность и цену товара.`,
      });
  }
  return result.sort(
    (a, b) => Number(b.severity === "high") - Number(a.severity === "high"),
  );
}
// Fixed, reproducible demonstration data. No WB requests or real seller information.
const catalog = [
  [
    "1001",
    "Набор контейнеров, 3 шт.",
    "Дом",
    "Кухня",
    "anna",
    "home",
    1290,
    34,
  ],
  ["1002", "Кружка керамическая", "Дом", "Кухня", "anna", "home", 690, 48],
  ["1003", "Органайзер для специй", "Дом", "Кухня", "max", "home", 890, 27],
  ["1004", "Ваза интерьерная", "Дом", "Декор", "anna", "home", 1890, 16],
  ["1005", "Плед хлопковый", "Дом", "Текстиль", "elena", "home", 2490, 19],
  ["1006", "Комплект полотенец", "Дом", "Текстиль", "elena", "home", 1590, 26],
  [
    "2001",
    "Наушники беспроводные",
    "Электроника",
    "Аудио",
    "max",
    "main",
    3490,
    24,
  ],
  [
    "2002",
    "Портативная колонка",
    "Электроника",
    "Аудио",
    "max",
    "main",
    2290,
    17,
  ],
  [
    "2003",
    "Зарядное устройство",
    "Электроника",
    "Аксессуары",
    "max",
    "main",
    1190,
    37,
  ],
  [
    "2004",
    "Кабель USB-C",
    "Электроника",
    "Аксессуары",
    "anna",
    "main",
    490,
    59,
  ],
  ["3001", "Коврик для йоги", "Спорт", "Фитнес", "elena", "main", 1690, 24],
  ["3002", "Набор эспандеров", "Спорт", "Фитнес", "elena", "main", 990, 35],
  ["3003", "Бутылка для воды", "Спорт", "Аксессуары", "anna", "main", 790, 29],
  ["4001", "Сыворотка для лица", "Красота", "Уход", "elena", "main", 1490, 23],
  ["4002", "Косметичка дорожная", "Красота", "Аксессуары", "", "main", 890, 21],
  [
    "5001",
    "Ежедневник недатированный",
    "Канцелярия",
    "Блокноты",
    "anna",
    "main",
    790,
    31,
  ],
  [
    "5002",
    "Набор маркеров",
    "Канцелярия",
    "Творчество",
    "max",
    "main",
    1190,
    20,
  ],
] as const;
export const demoRows: SalesRow[] = catalog.flatMap(
  (
    [productId, name, category, subcategory, manager, account, price, base],
    i,
  ) =>
    Array.from({ length: 60 }, (_, day) => {
      const current = day >= 30;
      const wave = 1 + Math.sin(day * 0.8 + i) * 0.18;
      const growth = current
        ? i === 6
          ? 0.62
          : i === 3
            ? 0.73
            : 1.16 + (i % 3) * 0.045
        : 1;
      const units = Math.max(0, Math.round(base * wave * growth));
      const revenue = units * price;
      return {
        productId,
        name,
        category,
        subcategory,
        manager,
        account,
        date: dateOffset(DEMO_END, day - 59),
        units,
        revenue,
        ads: Math.round(
          revenue * (i === 6 ? 0.24 : i === 2 ? 0.18 : 0.045 + (i % 4) * 0.012),
        ),
        cost: Math.round(revenue * (0.38 + (i % 3) * 0.025)),
        fees: Math.round(revenue * 0.23),
        plan: Math.round(base * price * 1.1),
        stock: i === 0 ? 65 : i === 10 ? 47 : base * 24,
      };
    }),
);
