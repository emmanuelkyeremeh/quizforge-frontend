import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <div className="flex pt-14">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-[1200px] mx-auto p-6 md:p-10 lg:p-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
