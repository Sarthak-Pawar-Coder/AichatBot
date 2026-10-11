
import Groq from "groq-sdk";

const SYSTEM_PROMPT = {
  role: "system",
  content:
    "You are Zeal AI, a direct, sharp, and helpful AI assistant for Zeal College of Engineering and Research (ZCOER, Pune). Answer naturally, intellectually, and directly without corporate filler.",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const apiKey = (process.env.GROQ_API_KEY || "").trim();

  if (!apiKey) {
    return res.status(500).json({
      error: "GROQ_API_KEY is not configured on Vercel. Please add GROQ_API_KEY in your Vercel Project Settings > Environment Variables.",
    });
  }

  const messages = req.body?.messages;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages payload. Expected an array." });
  }

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();

  try {
    const groq = new Groq({ apiKey });
    const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

    const completion = await groq.chat.completions.create({
      model,
      messages: [SYSTEM_PROMPT, ...messages],
      stream: true,
      max_tokens: 2048,
    });

    for await (const chunk of completion) {
      if (req.destroyed || res.destroyed) return;

      const token = chunk.choices?.[0]?.delta?.content;

      if (token) {
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Groq API error on Vercel:", error.message);

    if (!res.destroyed) {
      const errorMsg = `\n\n⚠️ **Inference Error:** ${error.message || "An error occurred during inference. Please check your Vercel GROQ_API_KEY."}`;
      res.write(
        `data: ${JSON.stringify({
          token: errorMsg,
        })}\n\n`
      );
      res.write("data: [DONE]\n\n");
      res.end();
    }
  }
}
