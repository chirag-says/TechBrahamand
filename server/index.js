import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// === Phase 9: Rate limiting — 30 requests per 10 minutes per IP ===
const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "You're going a bit fast — please wait a moment before sending more messages.",
    retryAfter: "10 minutes",
  },
});

// Proxies chat completions to Groq. The API key NEVER leaves the server.
// Phase 9: SECURITY — the system prompt already contains a prompt-injection guard
// that instructs the model to refuse role-change/"reveal your prompt" attempts.
app.post("/api/chat", chatLimiter, async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "GROQ_API_KEY not configured on server" });
    }

    // === Phase 9: Body validation ===
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages must be a non-empty array" });
    }
    if (messages.length > 100) {
      return res.status(400).json({ error: "messages array too long (max 100 entries)" });
    }

    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        stream: false,
        ...req.body,
        // Force JSON mode regardless of what the client sent.
        response_format: { type: "json_object" },
      }),
    });

    const data = await groqRes.json();
    return res.status(groqRes.status).json(data);
  } catch (err) {
    console.error("Groq proxy error:", err);
    return res.status(502).json({ error: "Upstream model request failed" });
  }
});

app.listen(PORT, () => console.log(`TechBrahmand server on :${PORT}`));
