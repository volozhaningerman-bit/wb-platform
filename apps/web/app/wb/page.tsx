import Link from "next/link";
export default function Page() {
  return (
    <main
      style={{ maxWidth: 680, margin: "80px auto", padding: 32 }}
      className="card"
    >
      <h1>Демонстрационный кабинет</h1>
      <p style={{ lineHeight: 1.8, margin: "20px 0" }}>
        Авторизация и подключение Wildberries пока не доступны. API-токены и
        пароли не запрашиваются. Вы можете посмотреть аналитику на
        демонстрационных данных.
      </p>
      <Link className="button primary" href="/dashboard">
        Открыть кабинет
      </Link>
    </main>
  );
}
