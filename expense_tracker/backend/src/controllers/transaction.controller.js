import Transaction from "../models/transaction.model.js";
import { getEmbedding } from "./ai.controller.js";

// @desc    Add new transaction
// @route   POST /api/transactions
// @access  Private
export const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    // Generate embedding for RAG
    const embeddingText = `${title} ${category} ${type}`;
    const embedding = await getEmbedding(embeddingText);

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date: date || Date.now(),
      userId: req.user._id,
      embedding,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all transactions for user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check ownership
    if (transaction.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await transaction.deleteOne();

    res.json({ message: "Transaction removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get transaction statistics for dashboard
// @route   GET /api/transactions/stats
// @access  Private
export const getStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Aggregate Total Income and Total Expenses
    const totals = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const income = totals.find((t) => t._id === "income")?.total || 0;
    const expense = totals.find((t) => t._id === "expense")?.total || 0;
    const balance = income - expense;

    // Aggregate by Category (Expenses only)
    const categoryData = await Transaction.aggregate([
      { $match: { userId, type: "expense" } },
      {
        $group: {
          _id: "$category",
          amount: { $sum: "$amount" },
        },
      },
      { $project: { name: "$_id", amount: 1, _id: 0 } },
    ]);

    // Aggregate by Date for trends (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const trendData = await Transaction.aggregate([
      {
        $match: {
          userId,
          date: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", income: 1, expense: 1, _id: 0 } },
    ]);

    res.json({
      summary: {
        balance,
        income,
        expense,
      },
      categoryData,
      trendData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
