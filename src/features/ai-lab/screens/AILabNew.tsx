/**
 * AI Lab - Production-Ready Kid-Friendly Interface
 * Amazing animations and super fun UI!
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Wand2,
  MessageCircle,
  Rocket,
  Trash2,
  Download,
  Copy,
  Check,
  AlertCircle,
  Clock,
  Star,
} from 'lucide-react';
import { Card3D } from '../../../app/components/3d-card';
import { Button3D } from '../../../app/components/3d-button';
import { LoadingAnimation } from '../../../app/components/LoadingAnimation';
import { SuccessAnimation } from '../../../app/components/SuccessAnimation';
import { FloatingSparkles } from '../../../app/components/FloatingSparkles';
import {
  aiLabFreeService,
  type CreationType,
  type CreationResult,
} from '../../../lib/services/ai-lab-free.service';

export function AILabNew() {
  const [selectedType, setSelectedType] = useState<CreationType>('webapp');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CreationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<CreationResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(aiLabFreeService.getHistory());
  }, []);

  // Check if API key is configured
  const isConfigured = aiLabFreeService.isConfigured();

  const creationTypes = [
    {
      type: 'webapp' as CreationType,
      icon: Wand2,
      label: 'Build Webapp',
      emoji: '🌐',
      color: 'from-blue-400 to-cyan-400',
      description: 'Create interactive web apps with AI!',
    },
    {
      type: 'chat' as CreationType,
      icon: MessageCircle,
      label: 'Ask ClayBot',
      emoji: '🤖',
      color: 'from-green-400 to-emerald-400',
      description: 'Chat with your AI tutor!',
    },
  ];

  const selectedCreationType = creationTypes.find(t => t.type === selectedType)!;

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt!');
      return;
    }

    if (!isConfigured) {
      setError('Please add your free Gemini API key to continue!');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const creation = await aiLabFreeService.generate({
        prompt: prompt.trim(),
        type: selectedType,
      });

      setResult(creation);
      setHistory(aiLabFreeService.getHistory());

      // Show success animation
      setShowSuccess(true);

      // Scroll to result after a brief delay
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (result?.output) {
      navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const blob = new Blob([result.output], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claymind-${result.type}-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const examplePrompts = aiLabFreeService.getExamplePrompts(selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      {/* Floating Sparkles */}
      <FloatingSparkles />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="w-16 h-16 text-purple-600 mx-auto" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-3">
            AI Lab - Create with AI! ✨
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Build amazing webapps and chat with your AI tutor - all powered by FREE AI! 🚀
          </p>
        </motion.div>

        {/* API Key Warning */}
        {!isConfigured && (
          <motion.div
            className="mb-6 p-4 bg-amber-100 border-2 border-amber-300 rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-900">Add Your FREE Gemini API Key!</p>
                <p className="text-sm text-amber-800">
                  Get it free at: <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">makersuite.google.com</a>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Type Selector */}
            <Card3D>
              <div className="p-8">
                <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  Choose Your Creation Mode
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {creationTypes.map((type) => (
                    <motion.button
                      key={type.type}
                      onClick={() => {
                        setSelectedType(type.type);
                        setPrompt('');
                        setResult(null);
                        setError(null);
                      }}
                      className={`relative p-8 rounded-3xl border-3 transition-all overflow-hidden ${
                        selectedType === type.type
                          ? 'border-transparent bg-gradient-to-br ' + type.color + ' text-white shadow-2xl'
                          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-xl'
                      }`}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Background Decoration */}
                      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl ${
                        selectedType === type.type ? 'bg-white/20' : 'bg-purple-100'
                      }`} style={{ transform: 'translate(30%, -30%)' }} />

                      <div className="relative z-10">
                        <div className="text-6xl mb-4">{type.emoji}</div>
                        <div className={`font-black text-2xl mb-2 ${selectedType === type.type ? 'text-white' : 'text-gray-900'}`}>
                          {type.label}
                        </div>
                        <div className={`text-base ${selectedType === type.type ? 'text-white/90' : 'text-gray-600'}`}>
                          {type.description}
                        </div>
                      </div>

                      {/* Selected Indicator */}
                      {selectedType === type.type && (
                        <motion.div
                          className="absolute top-4 right-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                        >
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5 text-green-500" />
                          </div>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </Card3D>

            {/* Example Prompts */}
            <Card3D>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  💡 Try these examples:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((example, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setPrompt(example)}
                      className="px-4 py-2 text-sm bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-800 rounded-full font-medium transition-all border-2 border-purple-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {example}
                    </motion.button>
                  ))}
                </div>
              </div>
            </Card3D>

            {/* Prompt Input */}
            <Card3D>
              <div className="p-6">
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  {selectedType === 'chat' ? '🗨️ Ask your question:' : '✍️ Describe what you want to create:'}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    selectedType === 'webapp'
                      ? 'e.g., A colorful calculator with big buttons and fun sounds...'
                      : selectedType === 'image'
                      ? 'e.g., A friendly robot teaching AI to kids in a futuristic classroom...'
                      : selectedType === 'animation'
                      ? 'e.g., Show how a neural network learns to recognize patterns...'
                      : 'e.g., How does machine learning work?...'
                  }
                  className="w-full p-4 border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none text-lg bg-purple-50/50"
                  rows={5}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleGenerate();
                    }
                  }}
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 Tip: Be specific and creative! Press Ctrl/Cmd + Enter to generate
                </p>
              </div>
            </Card3D>

            {/* Generate Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={
                !isGenerating && prompt.trim()
                  ? {
                      boxShadow: [
                        '0 0 0 0 rgba(147, 51, 234, 0)',
                        '0 0 0 15px rgba(147, 51, 234, 0)',
                        '0 0 0 0 rgba(147, 51, 234, 0)',
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            >
              <Button3D
                variant="primary"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full text-xl py-6"
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.div
                      className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Creating magic...
                  </span>
                ) : (
                  <motion.span
                    className="flex items-center justify-center gap-2"
                    animate={
                      prompt.trim()
                        ? { scale: [1, 1.05, 1] }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Rocket className="w-6 h-6" />
                    Generate {selectedCreationType.label}!
                  </motion.span>
                )}
              </Button3D>
            </motion.div>

            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 bg-red-100 border-2 border-red-300 rounded-2xl"
                >
                  <p className="text-red-800 font-medium flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading Animation */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <Card3D>
                    <LoadingAnimation
                      message={`Creating your ${selectedType}...`}
                      type={selectedType}
                    />
                  </Card3D>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result Display */}
            <AnimatePresence>
              {result && !isGenerating && (
                <motion.div
                  ref={resultRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                >
                  <Card3D>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          <Check className="w-6 h-6 text-green-500" />
                          Your Creation is Ready! 🎉
                        </h3>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={handleCopy}
                            className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-lg transition-all shadow-sm"
                            title="Copy code"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {copied ? (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <Check className="w-5 h-5 text-green-600" />
                              </motion.div>
                            ) : (
                              <Copy className="w-5 h-5 text-purple-600" />
                            )}
                          </motion.button>
                          {result.type === 'webapp' && (
                            <motion.button
                              onClick={handleDownload}
                              className="p-2 bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 rounded-lg transition-all shadow-sm"
                              title="Download HTML file"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Download className="w-5 h-5 text-blue-600" />
                            </motion.button>
                          )}
                        </div>
                      </div>

                      {/* Webapp Display */}
                      {result.type === 'webapp' && (
                        <div className="border-4 border-purple-200 rounded-2xl overflow-hidden bg-white shadow-xl">
                          <iframe
                            srcDoc={result.output}
                            className="w-full h-[600px]"
                            sandbox="allow-scripts allow-forms allow-modals"
                            title="Generated Content"
                          />
                        </div>
                      )}

                      {/* Chat Display */}
                      {result.type === 'chat' && (
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl">
                          <div className="prose prose-lg max-w-none">
                            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                              {result.output}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card3D>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel - History */}
          <div className="lg:col-span-1">
            <Card3D>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Recent Creations
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={() => {
                        aiLabFreeService.clearHistory();
                        setHistory([]);
                      }}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="space-y-3 max-h-[800px] overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No creations yet!</p>
                      <p className="text-sm mt-2">Start creating something amazing! 🚀</p>
                    </div>
                  ) : (
                    history.map((item) => (
                      <motion.div
                        key={item.id}
                        className="p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all cursor-pointer group"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setResult(item)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl">
                                {creationTypes.find(t => t.type === item.type)?.emoji}
                              </span>
                              <span className="text-xs font-medium text-gray-500">
                                {new Date(item.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2 font-medium">
                              {item.prompt}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              aiLabFreeService.deleteHistoryItem(item.id);
                              setHistory(aiLabFreeService.getHistory());
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessAnimation
            message="🎉 Creation Complete!"
            onComplete={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
