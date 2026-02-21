import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useTransactionStore } from "../../store/transaction-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "react-hot-toast";

const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Health",
  "Salary",
  "Gift",
  "Other",
];

export default function AddTransactionModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense" as "income" | "expense",
    category: "Other",
    date: new Date().toISOString().split("T")[0],
  });

  const { addTransaction, isLoading } = useTransactionStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      toast.success("Transaction added successfully!");
      setOpen(false);
      setFormData({
        title: "",
        amount: "",
        type: "expense",
        category: "Other",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      toast.error("Failed to add transaction");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand hover:bg-brand-dark text-white rounded-2xl font-bold gap-2 px-6 h-12 shadow-lg shadow-brand/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Plus className="w-5 h-5" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] border-none shadow-2xl p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Add Transaction
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Fill in the details below to track your income or expense.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="font-bold text-zinc-500 px-1">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Rent, Groceries..."
              className="rounded-2xl h-12 border-zinc-100 bg-zinc-50/50 focus:ring-brand focus:border-brand transition-all"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="font-bold text-zinc-500 px-1">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                className="rounded-2xl h-12 border-zinc-100 bg-zinc-50/50 focus:ring-brand focus:border-brand transition-all"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-zinc-500 px-1">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(val: "income" | "expense") =>
                  setFormData({ ...formData, type: val })
                }
              >
                <SelectTrigger className="rounded-2xl h-12 border-zinc-100 bg-zinc-50/50">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-zinc-500 px-1">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(val) =>
                  setFormData({ ...formData, category: val })
                }
              >
                <SelectTrigger className="rounded-2xl h-12 border-zinc-100 bg-zinc-50/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl max-h-[200px]">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="font-bold text-zinc-500 px-1">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="rounded-2xl h-12 border-zinc-100 bg-zinc-50/50"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              className="flex-1 rounded-2xl h-12 font-bold text-zinc-400 hover:text-zinc-600 transition-all"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-2xl h-12 bg-zinc-900 hover:bg-black text-white font-bold transition-all shadow-lg"
            >
              {isLoading ? "Saving..." : "Save Transaction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
