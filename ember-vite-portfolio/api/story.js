// /api/story.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messageLog } = req.body;
  if (!messageLog || !Array.isArray(messageLog)) {
    return res.status(400).json({ error: 'Invalid request body: messages array missing' });
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          { role: 'system', content: 'You are a fantasy world narrator crafting a compelling adventure story based on player actions. Respond in rich, vivid narrative prose.' },
          ...messageLog,
        ],
        temperature: 0.7
      })
    });

    const data = await groqResponse.json();

    // Basic error check
    if (!data || !data.choices || !data.choices[0]?.message?.content) {
      return res.status(500).json({ error: 'LLM did not return a proper response.' });
    }

    res.status(200).json({ reply: data.choices[0].message });
  } catch (err) {
    console.error('[Groq LLM Error]', err);
    res.status(500).json({ error: 'Internal server error during story generation.' });
  }
}
