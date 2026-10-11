import dotenv from 'dotenv';
dotenv.config({ override: true });

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import Groq from 'groq-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Load JSON body parsing middleware
app.use(express.json());

// Serve static frontend build
const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));

// System instruction
const SYSTEM_PROMPT = {
  role: "system",
  content: "You are Zeal AI, a direct, sharp, and helpful AI assistant. Answer queries naturally and directly without corporate filler or template frameworks."
};

// Initialize Groq client
const groqApiKey = (process.env.GROQ_API_KEY || "").trim();
const groq = new Groq({ apiKey: groqApiKey });

console.log(`[Init] Groq client initialized with key: ${groqApiKey ? groqApiKey.slice(0, 10) + '...' : 'NONE'}`);

app.post('/api/chat', async (req, res) => {
  // Set headers for Server-Sent Events (SSE) streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const userMessages = req.body.messages || [];
  const messages = [SYSTEM_PROMPT, ...userMessages];

  try {
    if (!groqApiKey) {
      throw new Error("Missing GROQ_API_KEY in environment. Please set your Groq API key in .env.");
    }

    const modelName = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

    console.log(`[Inference] Calling Groq model '${modelName}' with ${messages.length} messages...`);

    const completion = await groq.chat.completions.create({
      model: modelName,
      messages: messages,
      stream: true,
      max_tokens: 2048,
    });

    for await (const chunk of completion) {
      const token = chunk.choices[0]?.delta?.content;
      if (token) {
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }
    }

    console.log(`[Inference] Stream completed successfully.`);
  } catch (error) {
    console.error('[Groq API Error]:', error);

    const errorMessage = `\n\n⚠️ **Groq API Error:** ${error.message || 'An error occurred during inference.'}`;
    res.write(`data: ${JSON.stringify({ token: errorMessage })}\n\n`);
  } finally {
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// Serve index.html for SPA routes
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n==================================================`);
  console.log(`  Sarthak AI Chatbot Server`);
  console.log(`  Powered by: Groq (openai/gpt-oss-120b)`);
  console.log(`  Running on: http://localhost:${PORT}`);
  console.log(`==================================================\n`);
});
