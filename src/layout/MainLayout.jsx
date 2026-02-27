import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, CloudSun } from "lucide-react";

const MainLayout = () => {
  const location = useLocation();

  const isActive = (path) => 
    location.pathname === path 
      ? "bg-blue-600 text-white shadow-md" 
      : "text-gray-400 hover:bg-gray-800 hover:text-white";

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed inset-y-0 left-0 z-50 shadow-2xl">
        <div className="p-6 flex items-center gap-3 border-b border-gray-800">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <CloudSun className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">Weather<span className="text-blue-400">App</span></span>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          <Link to="/" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive("/")}`}>
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link to="/activities" className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive("/activities")}`}>
            <ClipboardList size={20} />
            <span className="font-medium">Activity</span>
          </Link>
        </nav>
      </aside>

      <div className="flex-1 ml-64 flex flex-col min-h-screen w-full">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 sticky top-0 z-10">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            {location.pathname === "/" ? "Weather Overview" : "Activity Management"}
          </h2>
        </header>

        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;