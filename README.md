# ChefBot - AI Cooking Assistant

ChefBot is a conversational AI chatbot that helps users discover recipes based on the ingredients they have at home.


# Chatbot Functionality

ChefBot is a cooking assistant powered by AI. Users can type in any ingredients they currently have (e.g. I have chicken, garlic, lemon, and herbs), and ChefBot will:

- Suggest 1–2 relevant recipes they can cook right now
- List which ingredients they already have ✅ and any small additions needed "➕You need" of "Add"
- Provide numbered step-by-step cooking instructions
- Include estimated cooking time and difficulty level
- Share a helpful cooking tip or fun food fact

The sidebar includes quick-tap ingredient chips and one-click action buttons for common requests (pantry meals, quick recipes, healthy options, desserts).


# Technologies Used

| Layer      | Technology                          
|------------|------------------------------------------
| Frontend   | HTML, CSS, JavaScript     
| Backend    | Node.js, Express.js                 
| AI API     | OpenRouter API (Openrouter:free) 
| Fonts      | Google Fonts (Playfair Display, DM Sans) 


# Setup & Run Instructions

# Prerequisites
- **Node.js** v18 or higher - [Download here](https://nodejs.org/)
- **OpenRouter API Key** - [Get a free key here](https://openrouter.ai/keys)

# Step 1 - Clone / Extract the project

# Project Structure

cooking-chatbot
|--- frontend
|   |---index.html       //Chat UI
|   |--- style.css       //All styles
|   |--- script.js       //API calls, DOM manipulation
|--- backend
|   |--- server.js       //Express server + OpenRouter integration
|   |--- package.json    //Dependencies
|   |--- .env            //Environment variable template
|--- README.md

# Step 2 - Set up environment variables

Create `backend/.env` and replace `sk-or-v1-xxxxxxxxxxxxxxxxxxxx` with your actual key. 

It should look like- 
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxx

# Step 3 - Install dependencies & start the server
In bash, enter -

cd backend
npm install
node server.js

# Step 4 - Open the website

Visit **http://localhost:3000** in your browser.

# Step 5- Enter Ingredients you have and the Chefbot will provide you with a receipe


# API Used

**OpenRouter** - [https://openrouter.ai]

- Model: `Openrouter:free` (free tier)


# Example Outputs

User: Give me a quick 15-minute meal idea  
ChefBot: Quick 15-Minute Meal Idea
*A fast, tasty fix that fits your time!*
Catchy Name: 🍜 Quick Stir-Fry Surprise!
Description: A fast, flavorful stir-fry perfect for busy nights—ready in minutes!
Ingredients:
✅ Chicken breast (if available), garlic, rice (if not on hand), bell peppers. *Add almonds if nuts are okay!*
Instructions:
1. Cook rice or set aside. 2. Sauté garlic and veggies in a pan. 3. Add protein, cook briefly. 4. Mix everything together! 5. Serve hot!
Time/Difficulty: 15 mins | Easy!
Tip: Bonus: Packable, nutrient-packed, and kid-friendly!
🍅 *Fun Fact*: Stir-fries boost metabolism while keeping calories low—perfect for busy mornings! 🍽️


User: I have chicken, garlic, and lemon 
ChefBot: 🍗 Garlic Lemon Zest Chicken Skillet
A vibrant dish with bold garlic and bright lemon flavors, cooked to tender perfection in one pan. Ready in under 30 minutes!
You have:
✅ Chicken (breast or thighs)
✅ Garlic
✅ Lemon
Add:
1 tbsp olive oil
1 tsp paprika (or smoked paprika for extra depth)
Salt and pepper
Fresh parsley (optional, for garnish)
Step-by-step instructions:
Season the chicken: Pat chicken dry, then sprinkle with paprika, salt, and pepper.
Sear the chicken: Heat olive oil in a skillet over medium-high heat. Cook chicken skin-side down for 5–6 minutes until golden. Flip and cook 3–4 minutes more. Remove and set aside.
Sauté garlic: In the same skillet, add minced garlic and cook 1 minute until fragrant.
Add lemon: Squeeze ½ a lemon over the garlic, then add the juice of 1 lemon and zest of another half (optional but brightens flavor). Simmer 2 minutes.
Combine and finish: Return chicken to the skillet, toss to coat in the lemon-garlic sauce. Cook 2–3 minutes until heated through.
Garnish and serve: Sprinkle with fresh parsley if using. Serve with rice, roasted veggies, or crusty bread to soak up the sauce!
Estimated time: 25–30 minutes
Difficulty: Easy
Pro tip: Don’t skip the lemon zest—it adds a burst of citrusy aroma! Pair with a glass of white wine for a cozy dinner. 🍋✨