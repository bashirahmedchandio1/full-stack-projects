import { GoogleGenerativeAI } from "@google/generative-ai";
import Transaction from "../models/transaction.model.js";
import dotenv from "dotenv";

// Lazy initialization of GenAI
let genAIInstance = null;
const getGenAI = () => {
  if (!genAIInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error(
        "[AI] GEMINI_API_KEY is missing from environment variables!",
      );
      throw new Error("Gemini API Key is not configured on the server.");
    }
    genAIInstance = new GoogleGenerativeAI(apiKey);
  }
  return genAIInstance;
};

// Helper to get embeddings
export const getEmbedding = async (text) => {
  try {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("[AI] Embedding error:", error.message);
    return [];
  }
};

// @desc    Chat with AI Assistant using RAG
// @route   POST /api/ai/chat
// @access  Private
export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  try {
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log(`[AI] Processing message for user: ${req.user._id}`);

    // 1. Generate embedding for the query
    let queryEmbedding = [];
    try {
      queryEmbedding = await getEmbedding(message);
      console.log(
        `[AI] Query embedding generated. Length: ${queryEmbedding.length}`,
      );
    } catch (embErr) {
      console.error("[AI] Error generating query embedding:", embErr.message);
    }

    // 2. Search for relevant transactions
    let relevantTransactions = [];
    let searchMethod = "none";

    // Try Vector Search if possible
    if (queryEmbedding.length > 0) {
      try {
        relevantTransactions = await Transaction.aggregate([
          {
            $vectorSearch: {
              index: "vector_index",
              path: "embedding",
              queryVector: queryEmbedding,
              numCandidates: 100,
              limit: 5,
            },
          },
          {
            $match: { userId: req.user._id },
          },
        ]);
        searchMethod = "vector";
        console.log(
          `[AI] Vector search found ${relevantTransactions.length} results.`,
        );
      } catch (vectorError) {
        console.warn(
          "[AI] Vector search failed, falling back.",
          vectorError.message,
        );
      }
    }

    // Fallback to recent transactions if vector search found nothing or failed
    if (relevantTransactions.length === 0) {
      relevantTransactions = await Transaction.find({ userId: req.user._id })
        .sort({ date: -1 })
        .limit(10);
      searchMethod = "fallback-recent";
      console.log(
        `[AI] Fallback search found ${relevantTransactions.length} results.`,
      );
    }

    // 3. Format context
    const context = relevantTransactions
      .map((t) => {
        const dateStr =
          t.date instanceof Date ? t.date.toDateString() : "Unknown Date";
        return `Transaction: ${t.title}, Amount: ${t.amount}, Type: ${t.type}, Category: ${t.category}, Date: ${dateStr}`;
      })
      .join("\n");

    // 4. Generate response with GenAI
    console.log("[AI] Requesting Gemini generation...");
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a helpful and professional Financial Assistant for the "SpendWise" app. 
      Your goal is to help users understand their spending habits based on their transaction history.

      User Query: "${message}"

      Context (Relevant Transactions):
      ${context || "No transaction data available for this user yet."}

      Instructions:
      - Use the provided context to answer accurately.
      - If context is empty, explain that you don't see any transactions yet and offer general financial tips.
      - Be concise, friendly, and use formatting (bold, lists) for readability.
      - If asked about totals, calculate them carefully based on the context provided.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("[AI] Generation successful.");

    res.status(200).json({
      text,
      citations: relevantTransactions.map((t) => ({
        title: t.title,
        amount: t.amount,
      })),
      meta: { searchMethod },
    });
  } catch (error) {
    console.error("FULL AI Chat error:", error);
    res.status(500).json({
      message: "AI Assistant is temporarily unavailable",
      error: error.message,
      details: "Check backend logs for full stack trace",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
