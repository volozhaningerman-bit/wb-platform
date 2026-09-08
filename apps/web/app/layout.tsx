import "./globals.css";
export const metadata = {
  title: "WB Platform — Кабинет руководителя",
  description:
    "Продажи, реклама и результаты команды. Демонстрационный кабинет WB Platform.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
