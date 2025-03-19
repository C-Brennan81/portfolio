import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request body: messages array missing" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "No message content returned from OpenAI" });
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ /api/story error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};
