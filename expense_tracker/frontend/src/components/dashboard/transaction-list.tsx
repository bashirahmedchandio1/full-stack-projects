import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { useTransactionStore } from "../../store/transaction-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export default function TransactionList() {
  const { transactions, deleteTransaction, isLoading } = useTransactionStore();

  if (!transactions.length && !isLoading) {
    return (
      <div className="text-center py-10 text-zinc-500">
        No transactions found. Add your first transaction to get started!
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-zinc-100 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-zinc-50/50">
          <TableRow>
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Type</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="text-right font-bold">Amount</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow
              key={t._id}
              className="hover:bg-zinc-50/30 transition-colors"
            >
              <TableCell className="font-semibold">{t.title}</TableCell>
              <TableCell>
                <span className="px-3 py-1 bg-zinc-100 rounded-full text-xs font-medium text-zinc-600">
                  {t.category}
                </span>
              </TableCell>
              <TableCell className="capitalize text-xs font-medium text-zinc-500">
                {t.type}
              </TableCell>
              <TableCell className="text-zinc-500 text-xs">
                {format(new Date(t.date), "MMM dd, yyyy")}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-bold",
                  t.type === "income" ? "text-green-600" : "text-red-500",
                )}
              >
                {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTransaction(t._id)}
                  className="text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
