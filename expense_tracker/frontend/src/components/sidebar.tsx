import { useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Settings,
  Bot,
  X,
  Menu,
} from "lucide-react";
import { useAuthStore } from "../store/auth-store";
import { useUI } from "../context/ui-context";
import { cn } from "../lib/utils";
import { toast } from "react-hot-toast";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useUI();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out");
      navigate("/");
    } catch (_error) {
      toast.error("Logout failed");
    }
  };

  const menuItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "Transactions",
      icon: TrendingUp,
      path: "/transactions",
    },
    {
      label: "AI Assistant",
      icon: Bot,
      path: "/ai-assistant",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 bg-white/80 backdrop-blur-md border-b border-zinc-100 p-4 flex justify-between items-center z-40">
        <div className="flex items-center gap-2" onClick={() => navigate("/")}>
          <div className="bg-brand p-1.5 rounded-lg">
            <Wallet className="text-white w-4 h-4" />
          </div>
          <span className="text-lg font-black tracking-tight">
            Spend<span className="text-brand">Wise</span>
          </span>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl bg-zinc-50 text-zinc-600 active:scale-95 transition-all"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar (Desktop & Mobile) */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-white border-r border-zinc-100 p-6 flex flex-col z-50 transition-transform lg:translate-x-0 duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div
          className="flex items-center gap-2 mb-10 px-2 cursor-pointer group"
          onClick={() => {
            navigate("/");
            closeSidebar();
          }}
        >
          <div className="bg-brand p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Wallet className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            Spend<span className="text-brand">Wise</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all",
                  isActive
                    ? "bg-brand/5 text-brand"
                    : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 font-semibold",
                )}
                onClick={() => {
                  navigate(item.path);
                  closeSidebar();
                }}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-zinc-100">
          <button
            onClick={() => {
              handleLogout();
              closeSidebar();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-500 transition-colors font-bold"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
