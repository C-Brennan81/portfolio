// /api/story.js
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messageLog } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a fantasy text adventure narrator. Present immersive storytelling and provide clear choices in each reply.',
        },
        ...messageLog
      ],
      temperature: 0.8,
    });

    res.status(200).json({ reply: response.data.choices[0].message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch story from LLM.' });
  }
}
