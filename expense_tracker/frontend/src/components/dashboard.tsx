import { useEffect } from "react";
import { motion } from "motion/react";
import { useAuthStore } from "../store/auth-store";
import { useTransactionStore } from "../store/transaction-store";
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Dashboard Components
import TransactionList from "./dashboard/transaction-list";
import AddTransactionModal from "./dashboard/add-transaction-modal";
import SpendingTrendsChart from "./dashboard/spending-trends-chart";
import CategoryBreakdownChart from "./dashboard/category-breakdown-chart";
import Sidebar from "./sidebar";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { stats, fetchStats, fetchTransactions } = useTransactionStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchTransactions();
  }, [fetchStats, fetchTransactions]);

  const statsCards = [
    {
      label: "Total Balance",
      value: stats?.summary.balance || 0,
      icon: Wallet,
      color: "text-brand",
      bg: "bg-brand/5",
    },
    {
      label: "Total Income",
      value: stats?.summary.income || 0,
      icon: ArrowUpRight,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Total Expenses",
      value: stats?.summary.expense || 0,
      icon: ArrowDownLeft,
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-poppins text-zinc-900 scroll-smooth">
      <Sidebar />

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-10 max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
              Welcome back,{" "}
              <span className="text-brand">{user?.name || "User"}</span>!
            </h1>
            <p className="text-zinc-500 font-medium">
              You have spent{" "}
              <span className="text-red-500 font-bold">
                ${stats?.summary.expense.toLocaleString()}
              </span>{" "}
              this month.
            </p>
          </div>
          <AddTransactionModal />
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {statsCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-4 rounded-[1.25rem] ${stat.bg} ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                {i === 0 && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-brand/10 text-brand px-2 py-1 rounded-full">
                    Live
                  </span>
                )}
              </div>
              <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-1 px-1">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-zinc-900 tabular-nums">
                ${stat.value.toLocaleString()}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Charts & Transactions Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* Trend Chart (Takes 2 columns) */}
          <div className="xl:col-span-2 space-y-8">
            <SpendingTrendsChart data={stats?.trendData || []} />

            <div className="space-y-6">
              <div className="flex justify-between items-end px-2">
                <h2 className="text-2xl font-black tracking-tight">
                  Recent Transactions
                </h2>
                <button
                  className="text-brand font-bold text-sm hover:underline"
                  onClick={() => navigate("/transactions")}
                >
                  View All
                </button>
              </div>
              <TransactionList />
            </div>
          </div>

          {/* Side Column (Category Breakdown) */}
          <div className="xl:col-span-1 h-full">
            <CategoryBreakdownChart data={stats?.categoryData || []} />
          </div>
        </div>
      </main>
    </div>
  );
}
