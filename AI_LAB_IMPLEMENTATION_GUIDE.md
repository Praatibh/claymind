# AI Lab Implementation Guide
## Complete Guide to Building Production-Ready AI Features

---

## 🎯 Overview

This guide will help you implement:
1. **Webapp Builder** - Kids can generate HTML/CSS/JS apps
2. **Image Generator** - AI-powered image creation
3. **Video Generator** - AI video creation
4. **Module Integration** - Link lessons to AI Lab projects

---

## 📋 Phase 1: Setup AI APIs (Week 1)

### Step 1: Get API Keys

#### For Code/Webapp Generation (Pick ONE):

**Option A: Anthropic Claude (Recommended)**
- Best for kid-friendly, safe responses
- Sign up: https://console.anthropic.com/
- Get API key from dashboard
- Cost: $0.015 per 1K tokens (very cheap)

**Option B: OpenAI GPT-4**
- Sign up: https://platform.openai.com/
- Get API key
- Cost: $0.03 per 1K tokens

#### For Image Generation (Pick ONE):

**Option A: DALL-E 3 (Easiest)**
- Same OpenAI account
- Cost: $0.04 per image
- Best quality

**Option B: Replicate (Cheaper)**
- Sign up: https://replicate.com/
- Use Stable Diffusion models
- Cost: $0.001 per image

#### For Video Generation (Pick ONE):

**Option A: Runway ML**
- Sign up: https://runwayml.com/
- API access in dashboard
- Cost: ~$0.05 per second of video

**Option B: D-ID (Talking Avatars)**
- Sign up: https://www.d-id.com/
- Great for educational videos
- Cost: $0.10 per minute

---

## 🔧 Phase 2: Backend Setup (Week 1-2)

### Step 2: Create API Service Files

Create `.env` file:
```env
# AI API Keys
VITE_ANTHROPIC_API_KEY=your_anthropic_key_here
VITE_OPENAI_API_KEY=your_openai_key_here
VITE_REPLICATE_API_KEY=your_replicate_key_here
VITE_RUNWAY_API_KEY=your_runway_key_here
```

**⚠️ SECURITY WARNING:**
- NEVER expose API keys in frontend code
- Use a backend proxy (Node.js/Express server)
- Or use Netlify/Vercel Functions

### Step 3: Create Backend Proxy (Recommended)

Create `server/index.js`:
```javascript
const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate Webapp
app.post('/api/generate-webapp', async (req, res) => {
  try {
    const { prompt } = req.body;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `You are a helpful coding assistant for kids aged 8-16.
        Generate a complete, working HTML file with embedded CSS and JavaScript for: ${prompt}

        Requirements:
        - Single HTML file with everything embedded
        - Colorful, fun, kid-friendly design
        - Include comments explaining the code
        - Make it interactive and educational
        - Keep it simple and safe

        Return ONLY the HTML code, nothing else.`
      }]
    });

    const code = message.content[0].text;

    res.json({
      success: true,
      code,
      preview: code // Can be rendered in iframe
    });
  } catch (error) {
    console.error('Generate error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate Image
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Kid-friendly, educational, safe for children: ${prompt}`,
      n: 1,
      size: '1024x1024',
    });

    res.json({
      success: true,
      imageUrl: response.data[0].url
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AI Lab API running on port ${PORT}`);
});
```

---

## 💻 Phase 3: Frontend Implementation (Week 2-3)

### Step 4: Update AI Lab Service

Update `src/lib/services/ai-lab.service.ts`:

```typescript
class AILabService {
  private apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // Generate Webapp
  async generateWebapp(prompt: string): Promise<{ code: string; preview: string }> {
    const response = await fetch(`${this.apiUrl}/api/generate-webapp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate webapp');
    }

    const data = await response.json();

    // Save to history
    this.addToHistory({
      id: `webapp_${Date.now()}`,
      type: 'webapp',
      prompt,
      output: data.code,
      timestamp: new Date().toISOString(),
    });

    return data;
  }

  // Generate Image
  async generateImage(prompt: string): Promise<{ imageUrl: string }> {
    const response = await fetch(`${this.apiUrl}/api/generate-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    this.addToHistory({
      id: `image_${Date.now()}`,
      type: 'image',
      prompt,
      output: data.imageUrl,
      timestamp: new Date().toISOString(),
    });

    return data;
  }

  // Generate Video (Coming Soon)
  async generateVideo(prompt: string): Promise<{ videoUrl: string }> {
    // Implement with Runway ML or D-ID API
    throw new Error('Video generation coming soon!');
  }

  private addToHistory(item: GenerationHistoryItem): void {
    const history = this.getHistory();
    history.unshift(item);
    localStorage.setItem('claymind_ai_lab_history', JSON.stringify(history.slice(0, 50)));
  }
}
```

### Step 5: Create AI Lab Tabs Component

Update `src/features/ai-lab/screens/AILab.tsx`:

```typescript
export function AILab() {
  const [mode, setMode] = useState<'webapp' | 'image' | 'video'>('webapp');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      if (mode === 'webapp') {
        const result = await aiLabService.generateWebapp(prompt);
        setOutput(result);
      } else if (mode === 'image') {
        const result = await aiLabService.generateImage(prompt);
        setOutput(result);
      } else if (mode === 'video') {
        const result = await aiLabService.generateVideo(prompt);
        setOutput(result);
      }
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6">
      {/* Mode Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('webapp')}
          className={mode === 'webapp' ? 'active' : ''}
        >
          🌐 Build Webapp
        </button>
        <button
          onClick={() => setMode('image')}
          className={mode === 'image' ? 'active' : ''}
        >
          🎨 Create Image
        </button>
        <button
          onClick={() => setMode('video')}
          className={mode === 'video' ? 'active' : ''}
        >
          🎥 Make Video
        </button>
      </div>

      {/* Prompt Input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={
          mode === 'webapp'
            ? 'Describe what you want to build... (e.g., "A colorful calculator with buttons")'
            : mode === 'image'
            ? 'Describe the image... (e.g., "A friendly robot learning AI")'
            : 'Describe the video... (e.g., "Explain how neural networks work")'
        }
        className="w-full p-4 border rounded-lg"
        rows={4}
      />

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg"
      >
        {isGenerating ? 'Generating...' : '✨ Generate'}
      </button>

      {/* Output Display */}
      {output && (
        <div className="mt-6">
          {mode === 'webapp' && (
            <iframe
              srcDoc={output.code}
              className="w-full h-96 border rounded-lg"
              sandbox="allow-scripts"
            />
          )}
          {mode === 'image' && (
            <img
              src={output.imageUrl}
              alt="Generated"
              className="max-w-full rounded-lg"
            />
          )}
          {mode === 'video' && (
            <video
              src={output.videoUrl}
              controls
              className="max-w-full rounded-lg"
            />
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 🎓 Phase 4: Module Integration (Week 3-4)

### Step 6: Link Lessons to AI Lab

For each module, add `aiLabProject` field to lessons:

```typescript
// Example: AI Basics Module
const aiBasicsLessons = [
  {
    id: '1',
    title: 'What is AI?',
    duration: '15 min',
    completed: false,
    aiLabProject: {
      type: 'webapp',
      prompt: 'Create a simple chatbot that responds to "Hello" and "How are you?"',
      hint: 'Use JavaScript prompt() and alert() to create conversation',
    }
  },
  {
    id: '2',
    title: 'Machine Learning Basics',
    duration: '20 min',
    completed: false,
    aiLabProject: {
      type: 'image',
      prompt: 'Draw a diagram showing how a computer learns from examples',
      hint: 'Include: Input → Training → Model → Output',
    }
  }
];
```

### Step 7: Add "Build in AI Lab" Button

In `LessonPlayer.tsx`:

```typescript
const handleOpenAILab = () => {
  const lesson = getCurrentLesson();
  if (lesson.aiLabProject) {
    navigate(`/ai-lab?prompt=${encodeURIComponent(lesson.aiLabProject.prompt)}&type=${lesson.aiLabProject.type}`);
  }
};

return (
  <div>
    {/* After lesson content */}
    {lesson.aiLabProject && (
      <button onClick={handleOpenAILab} className="ai-lab-btn">
        🚀 Build This in AI Lab
      </button>
    )}
  </div>
);
```

---

## 📊 Phase 5: Example Prompts for Each Module

### AI Basics Module
```typescript
const aiBasicsProjects = [
  { type: 'webapp', prompt: 'A chatbot that tells AI jokes' },
  { type: 'image', prompt: 'A robot learning from books' },
  { type: 'webapp', prompt: 'A simple decision tree game' },
];
```

### Machine Learning Module
```typescript
const mlProjects = [
  { type: 'webapp', prompt: 'A color classifier that categorizes colors as warm or cool' },
  { type: 'image', prompt: 'Show how a neural network recognizes a cat' },
  { type: 'webapp', prompt: 'A fruit classifier with emoji' },
];
```

### Computer Vision Module
```typescript
const visionProjects = [
  { type: 'webapp', prompt: 'An interactive image filter demo with CSS' },
  { type: 'image', prompt: 'Show different image filters (blur, sharpen, edge detection)' },
  { type: 'webapp', prompt: 'A drawing app that changes colors based on mouse position' },
];
```

### NLP Module
```typescript
const nlpProjects = [
  { type: 'webapp', prompt: 'A word counter that shows word frequency' },
  { type: 'webapp', prompt: 'A simple sentiment analyzer that shows happy/sad faces' },
  { type: 'image', prompt: 'Visualize how words are converted to numbers' },
];
```

---

## 🚀 Phase 6: Deployment (Week 4)

### Step 8: Deploy Backend

**Option A: Render (Free)**
```bash
# Push to GitHub, then on Render:
1. Create new Web Service
2. Connect GitHub repo
3. Build command: npm install
4. Start command: node server/index.js
5. Add environment variables (API keys)
```

**Option B: Railway (Free)**
```bash
railway login
railway init
railway up
```

### Step 9: Update Frontend API URL

Update `.env`:
```env
VITE_API_URL=https://your-backend.render.com
```

---

## 📈 Phase 7: Advanced Features (Week 5+)

### 1. Code Execution Sandbox
Use StackBlitz SDK for live code editing:
```bash
npm install @stackblitz/sdk
```

### 2. Image Editing Tools
Add basic filters before AI generation

### 3. Video Templates
Pre-made video templates kids can customize

### 4. Project Gallery
Save and share creations with other kids

### 5. AI Safety Features
- Content moderation API
- Inappropriate content filtering
- Parental controls

---

## 💰 Cost Estimation

For 1000 students/month:
- **Webapp Generation**: ~$15-30/month (500 requests)
- **Image Generation**: ~$40-80/month (1000 images)
- **Video Generation**: ~$50-100/month (50 videos)

**Total: ~$105-210/month**

---

## 🎯 Success Metrics

Track:
1. Number of generations per user
2. Completion rate of AI Lab projects
3. Most popular project types
4. Time spent in AI Lab
5. Projects saved to gallery

---

## 🔒 Safety & Compliance

1. **Content Moderation**: Use OpenAI Moderation API
2. **COPPA Compliance**: Require parent consent for under 13
3. **Rate Limiting**: Max 10 generations per hour per user
4. **Data Privacy**: Don't store prompts with PII
5. **Terms of Use**: Clear guidelines for acceptable use

---

## 📚 Resources

- Anthropic Claude Docs: https://docs.anthropic.com/
- OpenAI API Docs: https://platform.openai.com/docs
- Replicate Docs: https://replicate.com/docs
- StackBlitz SDK: https://developer.stackblitz.com/

---

## 🎉 Next Steps

1. **Week 1**: Get API keys, set up backend proxy
2. **Week 2**: Implement webapp generation
3. **Week 3**: Add image generation, link to modules
4. **Week 4**: Deploy and test with real users
5. **Week 5+**: Add video generation, advanced features

Ready to build something amazing! 🚀
