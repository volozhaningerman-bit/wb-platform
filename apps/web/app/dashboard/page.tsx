export default function DashboardPage() {
  return (
    <main className="dashboard">
      <h1>Dashboard</h1>

      <section>
        <h2>Ваш бизнес сегодня</h2>
        <div>
          <p>Продажи</p>
          <strong>1 240 000 ₽</strong>
        </div>
        <div>
          <p>Реклама</p>
          <strong>84 000 ₽</strong>
        </div>
        <div>
          <p>Прибыль</p>
          <strong>312 000 ₽</strong>
        </div>
      </section>

      <section>
        <h2>Структура оборота</h2>
        <p>Круговой график категорий будет подключен через аналитический модуль.</p>
      </section>

      <section>
        <h2>Инструменты</h2>
        <p>🟢 ECCO — активен</p>
        <p>🔒 Ads Control — скоро</p>
      </section>
    </main>
  )
}
