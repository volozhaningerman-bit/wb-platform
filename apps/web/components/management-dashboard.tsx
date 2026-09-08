"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Users,
  TriangleAlert,
  Package,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Search,
  SlidersHorizontal,
  Plug,
  HelpCircle,
  X,
  ArrowRight,
  CalendarDays,
  Store,
  Check,
} from "lucide-react";
import {
  accounts,
  managers,
  DEMO_END,
  dateOffset,
  demoRows,
  selectRows,
  summarize,
  groupRows,
  percentChange,
  getSignals,
  type SalesRow,
  type GroupKey,
  type Signal,
} from "@/lib/management-analytics";

const money = (v: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(v) + " ₽";
const compact = (v: number) =>
  new Intl.NumberFormat("ru-RU", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(v);
const pct = (v: number | null) =>
  v === null ? "—" : v.toFixed(1).replace(".", ",") + "%";
const colors = [
  "#6666d9",
  "#419b91",
  "#dca157",
  "#7598cc",
  "#b184bb",
  "#8b9c66",
  "#ce807c",
];
const color = (key: string) =>
  colors[[...key].reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length];
const dateLabel = (d: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(d + "T12:00:00Z"));
type ProductGroup = ReturnType<typeof groupRows>[number];
function Delta({ current, previous }: { current: number; previous: number }) {
  const value = percentChange(current, previous);
  return (
    <span
      className={
        "delta " + (value !== null && value < 0 ? "negative" : "positive")
      }
    >
      {value === null ? (
        "Нет базы сравнения"
      ) : (
        <>
          {value < 0 ? (
            <ArrowDownRight size={13} />
          ) : (
            <ArrowUpRight size={13} />
          )}{" "}
          {Math.abs(value).toFixed(1)}%
        </>
      )}
    </span>
  );
}
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    const el = ref.current;
    return () => el?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="detail-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={title}
    >
      <div className="dialog-heading">
        <h2>{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label="Закрыть">
          <X size={20} />
        </button>
      </div>
      {children}
    </dialog>
  );
}

function Distribution({
  mode,
  rows,
  previous,
  onProduct,
}: {
  mode: "category" | "manager";
  rows: SalesRow[];
  previous: SalesRow[];
  onProduct: (id: string) => void;
}) {
  const [path, setPath] = useState<string[]>([]);
  const keys: GroupKey[] =
    mode === "category"
      ? ["category", "subcategory", "productId"]
      : ["manager", "category", "subcategory", "productId"];
  const filter = (source: SalesRow[]) =>
    source.filter((r) => path.every((p, i) => r[keys[i]] === p));
  const scoped = filter(rows),
    oldScoped = filter(previous),
    total = summarize(scoped).revenue,
    grand = summarize(rows).revenue;
  const key = keys[path.length];
  const groups = groupRows(scoped, key),
    old = groupRows(oldScoped, key);
  const descend = (g: ProductGroup) =>
    key === "productId" ? onProduct(g.key) : setPath([...path, g.key]);
  const shown =
    groups.length > 6
      ? [
          ...groups.slice(0, 5),
          {
            key: "__other__",
            label: "Прочее",
            revenue: groups.slice(5).reduce((s, g) => s + g.revenue, 0),
          },
        ]
      : groups;
  const [all, setAll] = useState(false);
  return (
    <section className="panel distribution">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">СТРУКТУРА ПРОДАЖ</span>
          <h2>{mode === "category" ? "По категориям" : "По менеджерам"}</h2>
        </div>
        <span className="small-pill">
          {groups.length}{" "}
          {key === "manager"
            ? "ответственных"
            : key === "productId"
              ? "товаров"
              : "групп"}
        </span>
      </div>
      <div className="breadcrumbs">
        <button
          onClick={() => {
            setPath([]);
            setAll(false);
          }}
        >
          Все продажи
        </button>
        {path.map((p, i) => (
          <span key={i}>
            <ChevronRight size={12} />
            <button
              onClick={() => {
                setPath(path.slice(0, i + 1));
                setAll(false);
              }}
            >
              {keys[i] === "manager" ? managers[p] || p : p}
            </button>
          </span>
        ))}
      </div>
      {total === 0 ? (
        <div className="empty">За выбранный период продаж нет</div>
      ) : (
        <>
          <div className="distribution-body">
            <div className="donut-wrap">
              <ResponsiveContainer width="100%" height={232}>
                <PieChart>
                  <Pie
                    data={shown}
                    dataKey="revenue"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    innerRadius={76}
                    outerRadius={104}
                    paddingAngle={2}
                    stroke="none"
                    isAnimationActive={false}
                    onClick={(_, index) => {
                      const g = shown[index];
                      if (g.key === "__other__") setAll(true);
                      else {
                        const original = groups.find((x) => x.key === g.key);
                        if (original) descend(original);
                      }
                    }}
                  >
                    {shown.map((g) => (
                      <Cell
                        key={g.key}
                        fill={g.key === "__other__" ? "#c4c8d1" : color(g.key)}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => money(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <span>Продажи</span>
                <strong>{compact(total)} ₽</strong>
                <small>
                  {path.length
                    ? `${pct(grand ? (total / grand) * 100 : null)} от всех продаж`
                    : "100% выбранного периода"}
                </small>
              </div>
            </div>
            <div className="chart-legend">
              {(all ? groups : groups.slice(0, groups.length > 6 ? 5 : 6)).map(
                (g) => (
                  <button key={g.key} onClick={() => descend(g)}>
                    <i style={{ background: color(g.key) }} />
                    <span className="legend-name">
                      {g.label}
                      <small>{money(g.revenue)}</small>
                    </span>
                    <strong>{pct((g.revenue / total) * 100)}</strong>
                    <ChevronRight size={13} />
                  </button>
                ),
              )}
              {groups.length > 6 && !all && (
                <button className="text-button" onClick={() => setAll(true)}>
                  Прочее · ещё {groups.length - 5} <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
          <div className="distribution-foot">
            <span>
              {path.length
                ? "Доля рассчитана внутри выбранной группы"
                : "Выберите сегмент, чтобы посмотреть подробнее"}
            </span>
            {path.length > 0 ? (
              <button
                onClick={() => {
                  setPath(path.slice(0, -1));
                  setAll(false);
                }}
              >
                <ChevronLeft size={14} /> Назад
              </button>
            ) : (
              <Delta current={total} previous={summarize(oldScoped).revenue} />
            )}
          </div>
          {path.length > 0 && (
            <div className="drill-table">
              {groups.slice(0, 4).map((g) => (
                <div key={g.key}>
                  <span>{g.label}</span>
                  <Delta
                    current={g.revenue}
                    previous={old.find((o) => o.key === g.key)?.revenue || 0}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default function ManagementDashboard({
  initialView = "overview",
}: {
  initialView?: string;
}) {
  const [days, setDays] = useState(30),
    [account, setAccount] = useState("all"),
    [manager, setManager] = useState("all"),
    [view, setView] = useState(initialView),
    [search, setSearch] = useState(""),
    [sort, setSort] = useState("revenue"),
    [trend, setTrend] = useState<"sales" | "ads">("sales");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null),
    [selectedSignal, setSelectedSignal] = useState<Signal | null>(null),
    [info, setInfo] = useState<string | null>(null);
  const from = dateOffset(DEMO_END, 1 - days);
  const rows = useMemo(
    () => selectRows(demoRows, { from, to: DEMO_END, account, manager }),
    [from, account, manager],
  );
  const previous = useMemo(
    () =>
      selectRows(demoRows, {
        from: dateOffset(from, -days),
        to: dateOffset(from, -1),
        account,
        manager,
      }),
    [from, days, account, manager],
  );
  const total = summarize(rows),
    old = summarize(previous),
    signals = getSignals(rows, days),
    productGroups = groupRows(rows, "productId"),
    managerGroups = groupRows(rows, "manager");
  const product = productGroups.find((p) => p.key === selectedProduct);
  const filteredProducts = productGroups
    .filter((p) =>
      (p.label + " " + p.key).toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "profit"
        ? a.profit - b.profit
        : sort === "ads"
          ? b.ads - a.ads
          : b.revenue - a.revenue,
    );
  const timeline = Array.from({ length: days }, (_, i) => {
    const date = dateOffset(from, i);
    const a = summarize(rows.filter((r) => r.date === date));
    const b = summarize(
      previous.filter((r) => r.date === dateOffset(date, -days)),
    );
    return {
      date: dateLabel(date),
      value: trend === "sales" ? a.revenue : a.ads,
      previous: trend === "sales" ? b.revenue : b.ads,
    };
  });
  const nav = [
    { id: "overview", label: "Обзор бизнеса", icon: LayoutDashboard },
    { id: "analytics", label: "Аналитика продаж", icon: ChartNoAxesCombined },
    { id: "managers", label: "Менеджеры", icon: Users },
    { id: "attention", label: "Требует внимания", icon: TriangleAlert },
    { id: "products", label: "Товары", icon: Package },
  ];
  function exportCsv() {
    const header = [
      "Артикул",
      "Товар",
      "Менеджер",
      "Категория",
      "Продажи ₽",
      "Реклама ₽",
      "Прибыль ₽",
      "ДРР %",
    ];
    const lines = filteredProducts.map((p) => [
      p.key,
      p.label,
      managers[p.rows[0].manager],
      p.rows[0].category,
      p.revenue,
      p.ads,
      p.profit,
      p.drr?.toFixed(2) || "",
    ]);
    const csv =
      "\uFEFF" +
      [header, ...lines]
        .map((line) =>
          line.map((v) => '"' + String(v).replace(/"/g, '""') + '"').join(";"),
        )
        .join("\r\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `wb-demo-${from}-${DEMO_END}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function reset() {
    setDays(30);
    setAccount("all");
    setManager("all");
    setSearch("");
  }
  const filterKey = `${days}-${account}-${manager}`;
  return (
    <div className="management-app">
      <aside className="sidebar">
        <a href="/dashboard" className="brand">
          <span className="brand-symbol">
            w<span>·</span>
          </span>
          <span>
            WB Platform<small>УПРАВЛЕНИЕ ПРОДАЖАМИ</small>
          </span>
        </a>
        <div className="workspace-card">
          <span className="workspace-avatar">Д</span>
          <div>
            <strong>Демо-компания</strong>
            <small>Кабинет руководителя</small>
          </div>
          <span className="online-dot" />
        </div>
        <span className="nav-label">РАБОЧЕЕ ПРОСТРАНСТВО</span>
        <nav>
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setView(id)}
              className={view === id ? "active" : ""}
              aria-current={view === id ? "page" : undefined}
            >
              <Icon size={18} />
              {label}
              {id === "attention" && <b>{signals.length}</b>}
            </button>
          ))}
        </nav>
        <div className="nav-divider" />
        <nav>
          <button onClick={() => setInfo("wb")}>
            <Store size={18} /> WB-кабинеты <span className="soon">Демо</span>
          </button>
          <button onClick={() => setInfo("plugins")}>
            <Plug size={18} /> Плагины
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="demo-note">
            <span className="demo-dot" /> Демонстрационный режим
            <p>Посмотрите, как данные превращаются в решения.</p>
          </div>
          <button onClick={() => setInfo("help")}>
            <HelpCircle size={17} /> Как устроен кабинет
          </button>
          <div className="profile">
            <span>РК</span>
            <div>
              <strong>Руководитель</strong>
              <small>Просмотр демо</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <div>
            <span>Рабочее пространство</span>
            <ChevronRight size={13} />
            <strong>{nav.find((n) => n.id === view)?.label}</strong>
          </div>
          <div>
            <span className="demo-tag">ДЕМО-ДАННЫЕ</span>
            <span className="topbar-date">Срез на 7 сентября 2026</span>
            <button
              className="icon-button"
              aria-label="О данных"
              onClick={() => setInfo("help")}
            >
              <HelpCircle size={18} />
            </button>
          </div>
        </header>
        <main className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">ВАШ БИЗНЕС В ЦИФРАХ</div>
              <h1>
                {view === "overview"
                  ? "Всё важное — перед вами"
                  : nav.find((n) => n.id === view)?.label}
              </h1>
              <p>Продажи, команда и точки роста в одном пространстве.</p>
            </div>
            <button className="button secondary" onClick={exportCsv}>
              <Download size={16} /> Скачать отчёт
            </button>
          </div>
          <div className="filterbar">
            <div className="filter-control">
              <CalendarDays size={16} />
              <select
                aria-label="Период"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              >
                <option value={7}>Последние 7 дней</option>
                <option value={14}>Последние 14 дней</option>
                <option value={30}>Последние 30 дней</option>
              </select>
            </div>
            <span className="date-range">
              {dateLabel(from)} — {dateLabel(DEMO_END)}
            </span>
            <div className="filter-control">
              <Store size={15} />
              <select
                aria-label="WB-кабинет"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              >
                <option value="all">Все WB-кабинеты</option>
                {Object.entries(accounts).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-control">
              <Users size={15} />
              <select
                aria-label="Менеджер"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
              >
                <option value="all">Все менеджеры</option>
                {Object.entries(managers).map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <button className="reset-filter" onClick={reset}>
              Сбросить
            </button>
          </div>
          <div className="comparison-note">
            Сравнение с {dateLabel(dateOffset(from, -days))} —{" "}
            {dateLabel(dateOffset(from, -1))} · одинаковое количество дней
          </div>
          <section className="kpi-grid" aria-label="Основные показатели">
            {[
              {
                label: "Продажи",
                value: money(total.revenue),
                current: total.revenue,
                previous: old.revenue,
                foot: `${total.units.toLocaleString("ru-RU")} проданных единиц`,
                className: "featured",
              },
              {
                label: "Выполнение плана",
                value: pct(
                  total.plan ? (total.revenue / total.plan) * 100 : null,
                ),
                foot: `План ${money(total.plan)}`,
                className: "",
              },
              {
                label: "Расходы на рекламу",
                value: money(total.ads),
                foot: `Ранее ${money(old.ads)}`,
                className: "",
              },
              {
                label: "ДРР от всех продаж",
                value: pct(total.drr),
                foot: "Реклама / продажи × 100%",
                className: "",
              },
              {
                label: "Расчётная прибыль",
                value: money(total.profit),
                current: total.profit,
                previous: old.profit,
                foot: `Маржинальность ${pct(total.margin)}`,
                className: "",
              },
            ].map((k) => (
              <article className={"kpi " + k.className} key={k.label}>
                <span>{k.label}</span>
                <strong>{k.value}</strong>
                <div>
                  {k.current !== undefined && (
                    <Delta current={k.current} previous={k.previous!} />
                  )}
                  <small>{k.foot}</small>
                </div>
                {k.label === "Выполнение плана" && (
                  <div className="plan-track">
                    <i
                      style={{
                        width:
                          Math.min(
                            100,
                            total.plan ? (total.revenue / total.plan) * 100 : 0,
                          ) + "%",
                      }}
                    />
                  </div>
                )}
              </article>
            ))}
          </section>
          {(view === "overview" || view === "analytics") && (
            <>
              <section className="panel trend-panel">
                <div className="panel-heading">
                  <div>
                    <h2>
                      Динамика{" "}
                      {trend === "sales" ? "продаж" : "рекламных расходов"}
                    </h2>
                    <p>Каждый день в сравнении с предыдущим периодом</p>
                  </div>
                  <div className="segmented">
                    <button
                      onClick={() => setTrend("sales")}
                      aria-pressed={trend === "sales"}
                      className={trend === "sales" ? "selected" : ""}
                    >
                      Продажи
                    </button>
                    <button
                      onClick={() => setTrend("ads")}
                      aria-pressed={trend === "ads"}
                      className={trend === "ads" ? "selected" : ""}
                    >
                      Реклама
                    </button>
                  </div>
                </div>
                <div className="trend-summary">
                  <strong>
                    {money(trend === "sales" ? total.revenue : total.ads)}
                  </strong>
                  <span>
                    <i className="key-current" /> Текущий период
                  </span>
                  <span>
                    <i className="key-previous" /> Предыдущий
                  </span>
                </div>
                <div
                  className="trend-chart"
                  role="img"
                  aria-label="Динамика по дням. Точные значения доступны в таблице ниже."
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={timeline}
                      margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="sales-fill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#7470dd"
                            stopOpacity={0.18}
                          />
                          <stop
                            offset="100%"
                            stopColor="#7470dd"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="#edf0f3" />
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#8a909d" }}
                        minTickGap={40}
                      />
                      <YAxis
                        tickFormatter={(v) => compact(v)}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: "#8a909d" }}
                        width={56}
                      />
                      <Tooltip
                        formatter={(v, name) => [
                          money(Number(v)),
                          name === "value"
                            ? "Текущий период"
                            : "Предыдущий период",
                        ]}
                      />
                      <Area
                        type="monotone"
                        dataKey="previous"
                        stroke="#b9bfcf"
                        strokeDasharray="5 5"
                        fill="none"
                        strokeWidth={2}
                        isAnimationActive={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#7168cf"
                        fill="url(#sales-fill)"
                        strokeWidth={2.5}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <details className="daily-details">
                  <summary>Значения по дням</summary>
                  <div className="daily-grid">
                    {timeline.map((d) => (
                      <div key={d.date}>
                        <span>{d.date}</span>
                        <strong>{money(d.value)}</strong>
                        <small>Ранее {money(d.previous)}</small>
                      </div>
                    ))}
                  </div>
                </details>
              </section>
              <div className="distribution-grid">
                <Distribution
                  key={"cat" + filterKey}
                  mode="category"
                  rows={rows}
                  previous={previous}
                  onProduct={setSelectedProduct}
                />
                <Distribution
                  key={"mgr" + filterKey}
                  mode="manager"
                  rows={rows}
                  previous={previous}
                  onProduct={setSelectedProduct}
                />
              </div>
            </>
          )}
          {(view === "overview" || view === "attention") && (
            <section className="panel attention-panel">
              <div className="panel-heading">
                <div className="heading-inline">
                  <span className="alert-icon">
                    <TriangleAlert size={18} />
                  </span>
                  <div>
                    <h2>
                      Требует внимания{" "}
                      <span className="count">{signals.length}</span>
                    </h2>
                    <p>Ситуации, которые стоит проверить сегодня</p>
                  </div>
                </div>
                {view === "overview" && (
                  <button
                    className="text-button"
                    onClick={() => setView("attention")}
                  >
                    Все ситуации <ArrowRight size={15} />
                  </button>
                )}
              </div>
              {signals.length === 0 ? (
                <div className="empty">
                  <Check size={20} /> Отклонений по заданным правилам нет
                </div>
              ) : (
                <div className="signal-list">
                  {(view === "overview" ? signals.slice(0, 3) : signals).map(
                    (s) => (
                      <button
                        className="signal"
                        key={s.id}
                        onClick={() => setSelectedSignal(s)}
                      >
                        <span className={"signal-dot " + s.severity} />
                        <div>
                          <strong>{s.title}</strong>
                          <small>
                            {s.name} · {s.productId}
                          </small>
                        </div>
                        <span className="signal-manager">
                          {managers[s.manager]}
                        </span>
                        <span className={"signal-tag " + s.severity}>
                          {s.kind === "ads"
                            ? "Реклама"
                            : s.kind === "stock"
                              ? "Остатки"
                              : "План"}
                        </span>
                        <ChevronRight size={16} />
                      </button>
                    ),
                  )}
                </div>
              )}
            </section>
          )}
          {(view === "overview" || view === "managers") && (
            <section className="panel table-panel">
              <div className="panel-heading">
                <div>
                  <h2>Результаты менеджеров</h2>
                  <p>
                    Ответственность за ассортимент и вклад в общий результат
                  </p>
                </div>
                <span className="small-pill">
                  {managerGroups.length} в выборке
                </span>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Менеджер</th>
                      <th>Продажи</th>
                      <th>Динамика</th>
                      <th>План</th>
                      <th>Реклама</th>
                      <th>ДРР</th>
                      <th>Прибыль</th>
                      <th>Сигналы</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managerGroups.map((g) => (
                      <tr key={g.key}>
                        <td>
                          <button
                            className="manager-link"
                            onClick={() => {
                              setManager(g.key);
                              setView("analytics");
                            }}
                          >
                            <span
                              className="avatar"
                              style={{
                                background: color(g.key) + "20",
                                color: color(g.key),
                              }}
                            >
                              {g.label
                                .split(" ")
                                .map((s) => s[0])
                                .slice(0, 2)
                                .join("")}
                            </span>
                            <span>
                              {g.label}
                              <small>
                                {new Set(g.rows.map((r) => r.productId)).size}{" "}
                                товаров
                              </small>
                            </span>
                          </button>
                        </td>
                        <td className="number-emphasis">{money(g.revenue)}</td>
                        <td>
                          <Delta
                            current={g.revenue}
                            previous={
                              summarize(
                                previous.filter((r) => r.manager === g.key),
                              ).revenue
                            }
                          />
                        </td>
                        <td>
                          <span
                            className={g.revenue < g.plan ? "warning-text" : ""}
                          >
                            {pct(g.plan ? (g.revenue / g.plan) * 100 : null)}
                          </span>
                        </td>
                        <td>{money(g.ads)}</td>
                        <td>{pct(g.drr)}</td>
                        <td>{money(g.profit)}</td>
                        <td>
                          <button
                            className="signal-count"
                            onClick={() => {
                              setManager(g.key);
                              setView("attention");
                            }}
                          >
                            {signals.filter((s) => s.manager === g.key).length}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {managerGroups.length === 0 && (
                  <div className="empty">
                    В выбранном кабинете нет товаров этого менеджера.{" "}
                    <button onClick={reset}>Сбросить фильтры</button>
                  </div>
                )}
              </div>
            </section>
          )}
          {(view === "products" || view === "analytics") && (
            <section className="panel table-panel">
              <div className="panel-heading">
                <div>
                  <h2>Товары</h2>
                  <p>Выберите товар для подробного разбора</p>
                </div>
                <div className="product-controls">
                  <label className="search">
                    <Search size={16} />
                    <input
                      aria-label="Поиск товара"
                      placeholder="Название или артикул"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                  <div className="filter-control">
                    <SlidersHorizontal size={15} />
                    <select
                      aria-label="Сортировка товаров"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="revenue">По продажам ↓</option>
                      <option value="profit">По прибыли ↑</option>
                      <option value="ads">По рекламе ↓</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Товар</th>
                      <th>Менеджер</th>
                      <th>Продажи</th>
                      <th>Реклама</th>
                      <th>ДРР</th>
                      <th>Прибыль</th>
                      <th>Маржа</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.key}>
                        <td>
                          <button
                            className="product-link"
                            onClick={() => setSelectedProduct(p.key)}
                          >
                            {p.label}
                            <small>
                              {p.key} · {p.rows[0].category}
                            </small>
                          </button>
                        </td>
                        <td>{managers[p.rows[0].manager]}</td>
                        <td>{money(p.revenue)}</td>
                        <td>{money(p.ads)}</td>
                        <td className={(p.drr || 0) > 15 ? "warning-text" : ""}>
                          {pct(p.drr)}
                        </td>
                        <td>{money(p.profit)}</td>
                        <td>{pct(p.margin)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!filteredProducts.length && (
                  <div className="empty">
                    Товары не найдены. Измените поиск или фильтры.
                  </div>
                )}
              </div>
            </section>
          )}
          <footer className="page-footer">
            <span>WB Platform · Кабинет руководителя</span>
            <span>Демонстрационные данные · Не подключено к Wildberries</span>
          </footer>
        </main>
      </div>
      {selectedProduct && product && (
        <Modal title={product.label} onClose={() => setSelectedProduct(null)}>
          <p className="modal-subtitle">
            Артикул {product.key} · {product.rows[0].category} /{" "}
            {product.rows[0].subcategory}
          </p>
          <div className="detail-metrics">
            <div>
              <span>Продажи</span>
              <strong>{money(product.revenue)}</strong>
            </div>
            <div>
              <span>Реклама</span>
              <strong>{money(product.ads)}</strong>
            </div>
            <div>
              <span>Себестоимость</span>
              <strong>{money(product.cost)}</strong>
            </div>
            <div>
              <span>Комиссии и логистика</span>
              <strong>{money(product.fees)}</strong>
            </div>
            <div>
              <span>Расчётная прибыль</span>
              <strong>{money(product.profit)}</strong>
            </div>
            <div>
              <span>Ответственный</span>
              <strong>{managers[product.rows[0].manager]}</strong>
            </div>
          </div>
          <p className="explanation">
            Прибыль = продажи − себестоимость − комиссии и логистика − реклама.
            Налоги и общехозяйственные расходы не учтены. В демо возвраты
            отсутствуют.
          </p>
          {signals
            .filter((s) => s.productId === product.key)
            .map((s) => (
              <div className="detail-signal" key={s.id}>
                <strong>{s.title}</strong>
                <p>{s.detail}</p>
              </div>
            ))}
        </Modal>
      )}
      {selectedSignal && (
        <Modal
          title={selectedSignal.title}
          onClose={() => setSelectedSignal(null)}
        >
          <p className="modal-subtitle">
            {selectedSignal.name} · Артикул {selectedSignal.productId}
          </p>
          <div className="detail-signal">
            <p>{selectedSignal.detail}</p>
          </div>
          <p>
            Ответственный за товар:{" "}
            <strong>{managers[selectedSignal.manager]}</strong>
          </p>
          <p className="explanation">
            Сигнал указывает на отклонение. Автор действий и причина не
            установлены. Демонстрационные пороги: ДРР выше 15%, запас менее 7
            дней, выполнение плана ниже 80%.
          </p>
          <button
            className="button primary"
            onClick={() => {
              setSelectedProduct(selectedSignal.productId);
              setSelectedSignal(null);
            }}
          >
            Разобрать товар <ArrowRight size={15} />
          </button>
        </Modal>
      )}
      {info && (
        <Modal
          title={
            info === "wb"
              ? "WB-кабинеты"
              : info === "plugins"
                ? "Инструменты платформы"
                : "Как читать этот кабинет"
          }
          onClose={() => setInfo(null)}
        >
          {info === "wb" ? (
            <>
              <p>
                Сейчас используются два демонстрационных магазина. Их можно
                переключать в фильтре над показателями.
              </p>
              <div className="detail-signal">
                <strong>Подключение WB ещё не реализовано</strong>
                <p>
                  Токены не запрашиваются и не сохраняются. Проверка доступа и
                  синхронизация будут подключены после готовности серверной
                  части.
                </p>
              </div>
            </>
          ) : info === "plugins" ? (
            <>
              <div className="plugin-preview">
                <span className="brand-symbol">e</span>
                <div>
                  <h3>ECCO</h3>
                  <p>Первый плагин WB Platform</p>
                </div>
                <span className="small-pill">В разработке</span>
              </div>
              <p className="explanation">
                Установка и подписки появятся после подключения реальных
                инструментов. Сейчас доступна демонстрация управленческой
                аналитики.
              </p>
            </>
          ) : (
            <>
              <p>
                Все блоки используют общие фильтры. Круги раскрываются
                независимо: категория → подкатегория → товар; менеджер → его
                категории → товары.
              </p>
              <p>
                Размер сегмента соответствует доле продаж в рублях внутри
                выбранной группы. Сравнение — с непосредственно предшествующим
                периодом той же длины.
              </p>
              <p>
                ДРР здесь — расходы на рекламу / все продажи. Это не ДРР только
                рекламных заказов.
              </p>
              <p>
                Каждый товар в демо закреплён за одним менеджером.
                Нераспределённые товары входят в «Без менеджера».
              </p>
              <p className="explanation">
                Фиксированный демонстрационный срез: 7 сентября 2026 года.
                Данные не поступают из WB. Прогноз остатков предполагает
                сохранение средней скорости продаж.
              </p>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
