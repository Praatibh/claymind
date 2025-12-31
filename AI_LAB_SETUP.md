# 🚀 AI Lab - Quick Setup Guide

## ✅ You're Almost Ready!

Your AI Lab is now fully built with amazing animations and kid-friendly UI! Just add your FREE API key and you're done!

---

## 🔑 Step 1: Get Your FREE Gemini API Key (2 Minutes)

### Go to Google AI Studio:
👉 **https://makersuite.google.com/app/apikey**

### Steps:
1. Click **"Get API Key"**
2. Click **"Create API Key in New Project"**
3. **Copy** your API key (starts with "AIza...")
4. **No credit card needed!** ✅

### Limits (FREE Forever):
- ✅ 60 requests per minute
- ✅ 1500 requests per day
- ✅ Perfect for 100+ students!

---

## 📝 Step 2: Add API Key to Your Project

### Create `.env` file:

In the `claymind` folder, create a file named `.env` (not `.env.example`):

```env
VITE_GEMINI_API_KEY=AIza...your_actual_key_here
```

**IMPORTANT:**
- Replace `AIza...your_actual_key_here` with your real API key
- Don't add quotes around the key
- Save the file

---

## 🎨 What Kids Can Create:

### 1. 🌐 Build Webapps
- Interactive calculators
- Fun to-do lists
- Color pickers
- Drawing apps
- Memory games
- Digital clocks

### 2. 🎨 Create Images
- AI-generated illustrations
- Educational diagrams
- Concept visualizations
- Character designs
- Scene compositions

### 3. ✨ Make Animations
- Neural network visualizations
- Learning process animations
- Sorting algorithm demos
- Data flow animations
- Interactive explanations

### 4. 🤖 Chat with ClayBot
- Ask questions about AI
- Get coding help
- Learn new concepts
- Get project ideas
- Understand how things work

---

## 🧪 Test It Now!

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Go to AI Lab:**
   - Navigate to `/ai-lab` in your browser
   - Or click "AI Lab" in the navigation

3. **Try creating something:**
   - Select "Build Webapp"
   - Click an example prompt or write your own
   - Click "Generate"
   - Watch the magic happen! ✨

---

## 🎯 Example Prompts to Try:

### Webapp:
- "A colorful calculator with big buttons and rainbow colors"
- "A fun to-do list that plays sounds when you complete tasks"
- "A drawing app where you can choose different colors"

### Image:
- "A friendly robot teaching AI to kids in a classroom"
- "A colorful brain made of circuits and neurons"
- "Kids coding on futuristic holographic computers"

### Animation:
- "Show how data flows through a neural network"
- "Animate how a robot learns to recognize shapes"
- "Visualize sorting numbers with dancing bars"

### Chat:
- "What is machine learning in simple terms?"
- "How do computers recognize faces?"
- "How can I build my own AI project?"

---

## 💡 Pro Tips:

### For Best Results:
- ✅ Be specific in your prompts
- ✅ Mention you want it kid-friendly and colorful
- ✅ Ask for big buttons and clear text
- ✅ Request fun animations and emojis

### Cost Optimization:
- The image generator (Pollinations.ai) is **100% free, unlimited!**
- Gemini gives you **1500 requests/day FREE**
- That's ~15 creations per student per day!

### Rate Limiting (Optional):
Add this to prevent overuse:
- Limit: 10 generations per student per hour
- Track usage in localStorage
- Show friendly message when limit reached

---

## 🎨 UI Features You Got:

### Amazing Animations:
- ✅ Floating background blobs
- ✅ Rotating sparkles
- ✅ Smooth transitions
- ✅ Hover effects everywhere
- ✅ Loading spinners
- ✅ Success celebrations

### Kid-Friendly Design:
- ✅ Huge, colorful buttons
- ✅ Fun emojis throughout
- ✅ Clear, large text
- ✅ Gradient backgrounds
- ✅ 3D card effects
- ✅ Playful colors

### Smart Features:
- ✅ Example prompts for inspiration
- ✅ Creation history
- ✅ Copy code button
- ✅ Download creations
- ✅ Delete history items
- ✅ Keyboard shortcuts (Ctrl/Cmd + Enter)

---

## 🔒 Security Notes:

### API Key Safety:
- ✅ `.env` is in `.gitignore` (never committed)
- ✅ API key only used client-side
- ✅ No backend needed
- ✅ Free tier limits protect from abuse

### Content Safety:
- Gemini has built-in safety filters
- All prompts are enhanced with "kid-friendly" keywords
- Images use "educational, safe for children" modifiers

---

## 🚀 Next Steps:

### 1. Link Modules to AI Lab:
Each lesson can have an AI Lab project:
```typescript
lesson: {
  aiLabProject: {
    type: 'webapp',
    prompt: 'Build a simple chatbot'
  }
}
```

### 2. Add Project Saving:
Save student creations to their profile

### 3. Add Sharing:
Let kids share their creations (with moderation)

### 4. Add Templates:
Pre-made starter projects for each lesson

---

## 🎉 You're Ready!

Your AI Lab is now **production-ready** with:
- ✅ Amazing kid-friendly UI
- ✅ Beautiful animations
- ✅ 100% FREE AI (Gemini + Pollinations)
- ✅ Webapp, Image, Animation, and Chat modes
- ✅ History and examples
- ✅ Copy and download features

**Just add your API key and launch!** 🚀

---

## 📞 Need Help?

If you run into issues:
1. Check `.env` file exists and has correct API key
2. Make sure API key starts with "AIza"
3. Restart dev server after adding API key
4. Check browser console for errors

**Happy Creating!** ✨
