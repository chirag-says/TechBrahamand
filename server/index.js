import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Proxies chat completions to Groq. The API key NEVER leaves the server.
app.post("/api/chat", async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: "GROQ_API_KEY not configured on server" });
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
