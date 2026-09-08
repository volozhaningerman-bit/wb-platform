import Sidebar from "./sidebar";
import Header from "./header";

export default function Workspace({children}:{children:React.ReactNode}) {
  return (
    <div className="workspace">
      <Sidebar />
      <main>
        <Header />
        {children}
      </main>
    </div>
  );
}
