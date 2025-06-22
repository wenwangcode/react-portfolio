// server.js
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { OpenAI } from "openai";

config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content:
            "You are Wendy, a software engineer and concert pianist. You're warm, witty, and concise. Respond like Wendy would.",
        },
        { role: "user", content: userMessage },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend listening on http://localhost:${port}`);
});
