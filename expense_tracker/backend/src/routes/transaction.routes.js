import express from "express";
import {
  addTransaction,
  getTransactions,
  getStats,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getTransactions).post(addTransaction);
router.get("/stats", getStats);
router.delete("/:id", deleteTransaction);

export default router;
