import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messageLog } = req.body;
  const messages = messageLog; // alias for clarity


  if (!messageLog || !Array.isArray(messageLog)) {
    return res.status(400).json({ error: 'Invalid request body: messageLog array missing' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messageLog,
      temperature: 0.8
    });

    const reply = completion.choices[0].message;
    res.status(200).json({ reply });
  } catch (err) {
    console.error('LLM Server Error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch story from LLM.' });
  }
}
