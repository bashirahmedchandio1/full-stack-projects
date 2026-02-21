import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import TransactionList from "./dashboard/transaction-list";
import AddTransactionModal from "./dashboard/add-transaction-modal";
import Sidebar from "./sidebar";

export default function TransactionsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-poppins text-zinc-900">
      <Sidebar />

      <main className="lg:ml-64 p-6 lg:p-10 max-w-7xl mx-auto">
        <header className="flex items-center gap-4 mb-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="rounded-xl hover:bg-zinc-100"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
              Transactions
            </h1>
            <p className="text-zinc-500 font-medium">
              History of all your financial movements
            </p>
          </div>
          <div className="ml-auto">
            <AddTransactionModal />
          </div>
        </header>

        <div className="bg-white p-2 rounded-[2.5rem] border border-zinc-100 shadow-sm">
          <TransactionList />
        </div>
      </main>
    </div>
  );
}
