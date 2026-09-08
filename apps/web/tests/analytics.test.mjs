import { test } from "node:test";
import assert from "node:assert/strict";
import {
  selectRows,
  summarize,
  groupRows,
  percentChange,
  getSignals,
} from "../lib/management-analytics.ts";
const rows = [
  {
    date: "2026-09-01",
    account: "a",
    manager: "anna",
    category: "Дом",
    subcategory: "Кухня",
    productId: "1",
    name: "Чашка",
    revenue: 1000,
    ads: 200,
    cost: 400,
    fees: 100,
    units: 10,
    stock: 2,
    plan: 1500,
  },
  {
    date: "2026-09-02",
    account: "a",
    manager: "anna",
    category: "Дом",
    subcategory: "Декор",
    productId: "2",
    name: "Ваза",
    revenue: 3000,
    ads: 100,
    cost: 1000,
    fees: 300,
    units: 15,
    stock: 100,
    plan: 2500,
  },
  {
    date: "2026-09-02",
    account: "b",
    manager: "",
    category: "Спорт",
    subcategory: "Фитнес",
    productId: "3",
    name: "Коврик",
    revenue: 2000,
    ads: 0,
    cost: 1000,
    fees: 200,
    units: 5,
    stock: 50,
    plan: 2000,
  },
];
test("filters inclusive dates and combines account with manager", () =>
  assert.deepEqual(
    selectRows(rows, {
      from: "2026-09-02",
      to: "2026-09-02",
      account: "a",
      manager: "anna",
    }),
    [rows[1]],
  ));
test("sales are conserved across categories and managers including unassigned", () => {
  for (const key of ["category", "manager"])
    assert.equal(
      groupRows(rows, key).reduce((s, g) => s + g.revenue, 0),
      6000,
    );
  assert.ok(groupRows(rows, "manager").some((g) => g.key === ""));
});
test("subcategory grouping preserves selected parent only", () =>
  assert.equal(
    groupRows(
      rows.filter((r) => r.category === "Дом"),
      "subcategory",
    ).length,
    2,
  ));
test("profit deducts ads, costs and marketplace fees once", () => {
  const s = summarize(rows);
  assert.equal(s.profit, 2700);
  assert.equal(s.drr, 5);
  assert.equal(s.units, 30);
});
test("empty and zero-baseline values are not misleading percentages", () => {
  assert.equal(summarize([]).drr, null);
  assert.equal(percentChange(100, 0), null);
  assert.equal(percentChange(150, 100), 50);
});
test("signals identify high ad share and low stock without attributing an action", () => {
  const signals = getSignals([rows[0]], 1);
  assert.ok(signals.some((s) => s.kind === "ads"));
  assert.ok(signals.some((s) => s.kind === "stock"));
  assert.ok(signals.every((s) => s.productId === "1"));
});

test("advertising without sales produces a signal and no infinite DRR", () => {
  const zero = { ...rows[0], revenue: 0, units: 0 };
  assert.equal(summarize([zero]).drr, null);
  assert.ok(getSignals([zero], 7).some((s) => s.kind === "ads"));
});
test("manager with no goods in a store gets an empty result", () =>
  assert.deepEqual(
    selectRows(rows, {
      from: "2026-09-01",
      to: "2026-09-02",
      account: "b",
      manager: "anna",
    }),
    [],
  ));
test("dates do not overlap between current and comparison periods", async () => {
  const { dateOffset, demoRows, DEMO_END } =
    await import("../lib/management-analytics.ts");
  for (const days of [7, 14, 30]) {
    const from = dateOffset(DEMO_END, 1 - days);
    const current = selectRows(demoRows, {
      from,
      to: DEMO_END,
      account: "all",
      manager: "all",
    });
    const previous = selectRows(demoRows, {
      from: dateOffset(from, -days),
      to: dateOffset(from, -1),
      account: "all",
      manager: "all",
    });
    assert.equal(new Set(current.map((r) => r.date)).size, days);
    assert.equal(current.length, previous.length);
    assert.ok(previous.every((r) => r.date < from));
    for (const manager of ["anna", "max", "elena", ""]) {
      const owned = current.filter((r) => r.manager === manager);
      assert.equal(
        groupRows(owned, "category").reduce((s, g) => s + g.revenue, 0),
        summarize(owned).revenue,
      );
    }
  }
});
