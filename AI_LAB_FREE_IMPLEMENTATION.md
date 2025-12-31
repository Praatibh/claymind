# 🆓 AI Lab - 100% FREE Implementation Guide
## Build Amazing AI Features Without Spending a Single Dollar

---

## 🎯 FREE AI Solutions

### For Webapp Building (Code Generation)
**✅ Google Gemini API - COMPLETELY FREE**
- 60 requests per minute
- 1500 requests per day
- Perfect for kids learning platform
- No credit card required!

### For Image Generation
**✅ Pollinations.ai - COMPLETELY FREE**
- Unlimited image generation
- No API key needed
- Based on Stable Diffusion
- No sign-up required

### For Video Generation
**✅ Skip for now OR Simple Animations**
- Use CSS animations instead
- Create animated slideshows
- Use Lottie animations (free)

---

## 🚀 Step 1: Setup Google Gemini (FREE Forever)

### Get Your Free API Key:

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Get API Key"
3. Click "Create API Key" (NO credit card needed!)
4. Copy your key

### Install Gemini SDK:

```bash
cd claymind
npm install @google/generative-ai
```

---

## 💻 Step 2: Create FREE AI Service

Create `src/lib/services/ai-free.service.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your free API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'YOUR_FREE_KEY_HERE');

export class AIFreeService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  /**
   * Generate Webapp Code (100% FREE)
   */
  async generateWebapp(prompt: string): Promise<{ code: string; preview: string }> {
    const enhancedPrompt = `You are a coding teacher for kids aged 8-16.
Generate a COMPLETE, working HTML file with embedded CSS and JavaScript for: ${prompt}

Requirements:
- Single HTML file (no external files)
- Colorful, fun, kid-friendly design
- Add helpful comments for learning
- Make it interactive
- Keep it simple and safe
- Use only HTML, CSS, and vanilla JavaScript

Return ONLY the HTML code, no explanations.`;

    const result = await this.model.generateContent(enhancedPrompt);
    const response = await result.response;
    let code = response.text();

    // Clean up the response (remove markdown code blocks if present)
    code = code.replace(/```html\n?/g, '').replace(/```\n?/g, '');

    // Save to history
    this.addToHistory({
      id: `webapp_${Date.now()}`,
      type: 'webapp',
      prompt,
      output: code,
      timestamp: new Date().toISOString(),
    });

    return { code, preview: code };
  }

  /**
   * Generate Image (100% FREE via Pollinations.ai)
   */
  async generateImage(prompt: string): Promise<{ imageUrl: string }> {
    // Pollinations.ai - No API key needed!
    const encodedPrompt = encodeURIComponent(`kid-friendly educational ${prompt}`);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;

    // Save to history
    this.addToHistory({
      id: `image_${Date.now()}`,
      type: 'image',
      prompt,
      output: imageUrl,
      timestamp: new Date().toISOString(),
    });

    return { imageUrl };
  }

  /**
   * Generate Simple Animation (FREE Alternative to Video)
   */
  async generateAnimation(prompt: string): Promise<{ animationCode: string }> {
    const enhancedPrompt = `Create a simple CSS animation for: ${prompt}

Generate HTML with CSS animations to demonstrate this concept.
Make it colorful, educational, and fun for kids.
Return ONLY the complete HTML code.`;

    const result = await this.model.generateContent(enhancedPrompt);
    const response = await result.response;
    let code = response.text();

    code = code.replace(/```html\n?/g, '').replace(/```\n?/g, '');

    return { animationCode: code };
  }

  /**
   * Chat with AI Helper (FREE)
   */
  async chatWithAI(message: string): Promise<{ response: string }> {
    const enhancedPrompt = `You are a friendly AI tutor for kids aged 8-16 learning about AI and coding.

Student's question: ${message}

Respond in a friendly, simple way that a kid can understand. Use emojis and examples.`;

    const result = await this.model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    return { response: text };
  }

  /**
   * Generate Code Explanation (FREE)
   */
  async explainCode(code: string): Promise<{ explanation: string }> {
    const prompt = `Explain this code to a kid aged 8-16 in simple terms:

\`\`\`
${code}
\`\`\`

Break it down line by line and explain what each part does. Use simple language and emojis.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;

    return { explanation: response.text() };
  }

  private addToHistory(item: any): void {
    const history = this.getHistory();
    history.unshift(item);
    localStorage.setItem('claymind_ai_lab_history', JSON.stringify(history.slice(0, 50)));
  }

  getHistory(): any[] {
    const stored = localStorage.getItem('claymind_ai_lab_history');
    return stored ? JSON.parse(stored) : [];
  }

  clearHistory(): void {
    localStorage.removeItem('claymind_ai_lab_history');
  }
}

export const aiFreeService = new AIFreeService();
```

---

## 🎨 Step 3: Update AI Lab Component

Update `src/features/ai-lab/screens/AILab.tsx`:

```typescript
import { useState } from 'react';
import { aiFreeService } from '../../../lib/services/ai-free.service';

export function AILab() {
  const [mode, setMode] = useState<'webapp' | 'image' | 'animation' | 'chat'>('webapp');
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setOutput(null);

    try {
      if (mode === 'webapp') {
        const result = await aiFreeService.generateWebapp(prompt);
        setOutput(result);
      } else if (mode === 'image') {
        const result = await aiFreeService.generateImage(prompt);
        setOutput(result);
      } else if (mode === 'animation') {
        const result = await aiFreeService.generateAnimation(prompt);
        setOutput(result);
      } else if (mode === 'chat') {
        const result = await aiFreeService.chatWithAI(prompt);
        setOutput(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const examplePrompts = {
    webapp: [
      'A colorful calculator with big buttons',
      'A simple to-do list with checkboxes',
      'A color picker that changes the background',
      'A digital clock with fun animations',
    ],
    image: [
      'A friendly robot teaching AI to kids',
      'A colorful brain made of circuits and neurons',
      'Kids learning coding on computers',
      'A futuristic classroom with AI helpers',
    ],
    animation: [
      'Show how data flows through a neural network',
      'Animate how a robot learns to walk',
      'Visualize sorting algorithm with dancing bars',
      'Show planets orbiting around the sun',
    ],
    chat: [
      'What is machine learning?',
      'How do computers recognize faces?',
      'Why is AI important?',
      'How can I build my own AI?',
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🚀 AI Lab - Build Anything!
        </h1>
        <p className="text-gray-600">
          Use free AI to create webapps, images, and animations
        </p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {(['webapp', 'image', 'animation', 'chat'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`p-4 rounded-2xl border-2 transition-all ${
              mode === m
                ? 'border-purple-500 bg-purple-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            <div className="text-3xl mb-2">
              {m === 'webapp' ? '🌐' : m === 'image' ? '🎨' : m === 'animation' ? '✨' : '💬'}
            </div>
            <div className="font-bold capitalize">{m}</div>
          </button>
        ))}
      </div>

      {/* Example Prompts */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Try these examples:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts[mode].map((example, i) => (
            <button
              key={i}
              onClick={() => setPrompt(example)}
              className="px-3 py-1 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input */}
      <div className="mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Describe what you want to ${mode === 'chat' ? 'ask' : 'create'}...`}
          className="w-full p-4 border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none"
          rows={4}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
          isGenerating
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl'
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            Generating...
          </span>
        ) : (
          `✨ Generate ${mode === 'chat' ? 'Answer' : mode.charAt(0).toUpperCase() + mode.slice(1)}`
        )}
      </button>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-700">
          ❌ {error}
        </div>
      )}

      {/* Output Display */}
      {output && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Result:</h2>
            <button
              onClick={() => setOutput(null)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              Clear
            </button>
          </div>

          {mode === 'webapp' && (
            <div className="border-4 border-purple-200 rounded-2xl overflow-hidden">
              <iframe
                srcDoc={output.code}
                className="w-full h-96 bg-white"
                sandbox="allow-scripts"
                title="Generated Webapp"
              />
            </div>
          )}

          {mode === 'image' && (
            <img
              src={output.imageUrl}
              alt="Generated"
              className="w-full rounded-2xl shadow-xl"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><text x="50%" y="50%" text-anchor="middle" fill="gray">Failed to load image</text></svg>';
              }}
            />
          )}

          {mode === 'animation' && (
            <div className="border-4 border-purple-200 rounded-2xl overflow-hidden">
              <iframe
                srcDoc={output.animationCode}
                className="w-full h-96 bg-white"
                sandbox="allow-scripts"
                title="Generated Animation"
              />
            </div>
          )}

          {mode === 'chat' && (
            <div className="p-6 bg-purple-50 border-2 border-purple-200 rounded-2xl">
              <div className="prose prose-purple max-w-none">
                {output.response}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 🔧 Step 4: Add Environment Variable

Create/update `.env`:

```env
# Google Gemini FREE API Key
VITE_GEMINI_API_KEY=your_free_gemini_key_here
```

---

## 🎓 Step 5: Link Modules to AI Lab

Update your module lessons with AI Lab projects:

```typescript
// Example: AI Basics Module
export const aiBasicsLessons = [
  {
    id: 'lesson-1',
    title: 'What is AI?',
    content: '...',
    aiLabProject: {
      type: 'chat',
      prompt: 'Explain what artificial intelligence is in simple terms',
    },
  },
  {
    id: 'lesson-2',
    title: 'Build Your First AI App',
    content: '...',
    aiLabProject: {
      type: 'webapp',
      prompt: 'A simple chatbot that responds to greetings',
    },
  },
  {
    id: 'lesson-3',
    title: 'Visualize AI',
    content: '...',
    aiLabProject: {
      type: 'image',
      prompt: 'A robot brain with colorful neurons connecting',
    },
  },
  {
    id: 'lesson-4',
    title: 'How AI Learns',
    content: '...',
    aiLabProject: {
      type: 'animation',
      prompt: 'Show how a neural network learns to recognize patterns',
    },
  },
];
```

---

## 📊 All Modules AI Lab Integration

### 1. AI Basics
- Lesson 1: Chat about AI concepts
- Lesson 2: Build a simple decision tree
- Lesson 3: Visualize AI brain
- Lesson 4: Animate learning process

### 2. Machine Learning
- Lesson 1: Build a color classifier
- Lesson 2: Create training data visualizer
- Lesson 3: Animate gradient descent
- Lesson 4: Build a simple predictor

### 3. Computer Vision
- Lesson 1: Build an image filter app
- Lesson 2: Generate different filter examples
- Lesson 3: Animate edge detection
- Lesson 4: Build a simple shape detector

### 4. Natural Language Processing
- Lesson 1: Build a word counter
- Lesson 2: Create a sentiment analyzer
- Lesson 3: Visualize word embeddings
- Lesson 4: Build a simple translator

### 5. Neural Networks
- Lesson 1: Visualize a neuron
- Lesson 2: Build activation function demo
- Lesson 3: Animate backpropagation
- Lesson 4: Build a simple neural net visualizer

---

## 💰 Cost Breakdown

### Monthly Costs: $0.00

- ✅ Google Gemini: FREE (1500 requests/day)
- ✅ Pollinations.ai Images: FREE (unlimited)
- ✅ Hosting: FREE (Vercel/Netlify)
- ✅ Database: FREE (localStorage)

**Total: ZERO DOLLARS** 🎉

---

## 🚀 Deployment (100% FREE)

### Deploy to Vercel (Free Forever):

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts, done!
```

Your app will be live at: `https://claymind.vercel.app`

---

## 📈 Rate Limits (FREE Tier)

**Google Gemini:**
- 60 requests per minute
- 1500 requests per day
- For 100 students: ~15 requests/student/day ✅

**Pollinations.ai:**
- Unlimited images ✅
- No rate limits

---

## 🎯 Pro Tips

1. **Add Rate Limiting**: Limit users to 10 AI Lab generations per hour
2. **Cache Results**: Save generated code/images to reuse
3. **Use Templates**: Pre-made templates reduce API calls
4. **Progressive Enhancement**: Start simple, add features later

---

## 📚 Example Projects Per Module

Create these as starter templates in AI Lab:

```typescript
export const starterProjects = {
  'ai-basics': [
    { name: 'Hello AI', prompt: 'A webpage that says hello in different languages' },
    { name: 'Magic 8 Ball', prompt: 'A decision maker that gives random AI answers' },
    { name: 'AI Quiz', prompt: 'A simple quiz about AI with score tracking' },
  ],
  'machine-learning': [
    { name: 'Number Guesser', prompt: 'A game that learns your number pattern' },
    { name: 'Color Mixer', prompt: 'Mix colors and see predictions' },
    { name: 'Data Grapher', prompt: 'Plot data points and show trends' },
  ],
  'computer-vision': [
    { name: 'Image Filters', prompt: 'Apply different CSS filters to images' },
    { name: 'Color Detector', prompt: 'Click image to show color name' },
    { name: 'Shape Drawer', prompt: 'Draw shapes and detect them' },
  ],
  'nlp': [
    { name: 'Word Counter', prompt: 'Count words and show statistics' },
    { name: 'Rhyme Finder', prompt: 'Find rhyming words' },
    { name: 'Story Generator', prompt: 'Mad libs style story creator' },
  ],
};
```

---

## 🎉 You're Ready!

With this setup, you can:
- ✅ Generate unlimited webapps
- ✅ Create unlimited images
- ✅ Build unlimited animations
- ✅ Chat with AI tutor
- ✅ All 100% FREE forever!

**Next Steps:**
1. Get your free Gemini API key
2. Add it to `.env`
3. Test the AI Lab
4. Add it to your modules
5. Launch! 🚀

**No credit card. No costs. No limits.** Perfect for a learning platform! 💜
