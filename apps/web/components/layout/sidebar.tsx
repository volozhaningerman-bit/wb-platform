export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">WB Platform</div>
      <nav>
        <a href="/dashboard">Dashboard</a>
        <a href="/analytics">Analytics</a>
        <a href="/wb">Wildberries</a>
        <a href="/plugins">Plugins</a>
        <a href="/subscription">Subscription</a>
      </nav>
    </aside>
  );
}
