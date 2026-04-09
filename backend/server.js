//  ChefBot Backend - server.js 
// Node.js + Express + OpenRouter AI API

const express = require('express');
const cors    = require('cors');
const path    = require('path');

require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const frontendPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, '..', 'frontend')
  : path.join(__dirname, '..', 'frontend');

app.use(express.static(frontendPath));
const SYSTEM_PROMPT = `You are ChefBot, a friendly and knowledgeable AI cooking assistant. 
Your role is to help users cook delicious meals using the ingredients they already have at home. Reply as fast as possible with clear, concise, and practical cooking advice.

When a user tells you what ingredients they have and what kinf of recipe they want, you should:
1. Suggest 1–2 suitable recipes they can make can be small unless user says otherwise. Focus on dishes that are simple, tasty, and use the ingredients mentioned.
2. For each recipe, provide:
   - A catchy recipe name with a relevant emoji
   - A brief description (1–2 sentences)
   - Ingredients (mark which ones the user already has ✅, and any minor additions needed "➕You need" at the end ) Don't use | or - or em dashes.
   - Step-by-step cooking instructions (numbered)
   - Estimated cooking time and difficulty level
3. If the user mentions dietary restrictions or preferences (vegetarian, gluten-free, etc.), respect those.
4. Keep your tone warm, encouraging, and enthusiastic about cooking.
5. If ingredients are very limited, suggest simple yet satisfying meals and be creative.
6. End with a short tip or fun food fact related to the recipe.

Format your response clearly using markdown style headers and bullet points where appropriate.
Always be helpful even if the ingredient list is unusual, part of cooking is improvisation!`;

//  API Route: /api/chat 
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured. Please set OPENROUTER_API_KEY in your .env file.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'ChefBot Cooking Assistant'
      },
      body: JSON.stringify({
        model: 'openrouter/free',  // Free model on OpenRouter
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: message.trim() }
        ],
        max_tokens: 1500,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData?.error?.message || `OpenRouter API returned status ${response.status}`;
      console.error('OpenRouter error:', errMsg);
      return res.status(502).json({ error: `AI service error: ${errMsg}` });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({ error: 'Received an empty response from the AI. Please try again.' });
    }

    return res.json({ reply });

  } catch (err) {
    console.error('Server error:', err.message);
    return res.status(500).json({ error: 'Internal server error. Please check the server logs.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

//  Start server 
app.listen(PORT, () => {
  console.log(`\n🍳  ChefBot server running at http://localhost:${PORT}`);
});
