// Updated story.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messageLog, tone = 'Serious', genre = 'Fantasy' } = req.body;
  if (!messageLog || !Array.isArray(messageLog)) {
    return res.status(400).json({ error: 'Invalid request body: messages array missing' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: `You are a fantasy narrator in a ${genre} setting. Keep the tone ${tone.toLowerCase()} You are the narrator or DM for a choose your own adventure game and should respond in such a way Respond in no more than 3 short sentences.`
          },
          ...messageLog
        ],
        max_tokens: 150,
        temperature: 0.8
      })
    });

    const data = await response.json();
    if (!data || !data.choices || !data.choices[0]?.message?.content) {
      return res.status(500).json({ error: 'LLM did not return a proper response.' });
    }

    res.status(200).json({ reply: data.choices[0].message });
  } catch (err) {
    console.error('[Groq LLM Error]', err);
    res.status(500).json({ error: 'Internal server error during story generation.' });
  }
}
