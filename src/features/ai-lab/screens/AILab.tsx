/**
 * AI Lab Screen
 * Interactive AI playground with generation, history, and project saving
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  Shield,
  Play,
  Zap,
  Save,
  RotateCcw,
  History,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  X,
} from 'lucide-react';
import { Card3D } from '../../../app/components/3d-card';
import { Button3D } from '../../../app/components/3d-button';
import { FloatingMascot } from '../../../app/components/floating-mascot';
import {
  aiLabService,
  type GenerationHistoryItem,
} from '../../../lib/services/ai-lab.service';

type GenerateStatus = 'idle' | 'generating' | 'success' | 'error';
type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

export function AILab() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [currentHistoryId, setCurrentHistoryId] = useState<string | null>(null);
  const [generateStatus, setGenerateStatus] = useState<GenerateStatus>('idle');
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const examples = aiLabService.getExamplePrompts().slice(0, 3);

  // Load history on mount
  useEffect(() => {
    setHistory(aiLabService.getHistory());
  }, []);

  // Handle URL params (e.g., from Projects page)
  useEffect(() => {
    const mode = searchParams.get('mode');
    const projectId = searchParams.get('project');

    if (mode === 'create') {
      // Fresh create mode - clear everything
      handleReset();
    } else if (projectId) {
      // Loading existing project - could load project data here
      // For now, just clear
      handleReset();
    }
  }, [searchParams]);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || generateStatus === 'generating') return;

    setGenerateStatus('generating');
    setGenerateError(null);
    setOutput('');
    setSaveStatus('idle');
    setSaveMessage(null);

    try {
      const result = await aiLabService.generate({ prompt: prompt.trim() });
      setOutput(result.output);
      setCurrentHistoryId(result.historyId);
      setGenerateStatus('success');
      // Refresh history
      setHistory(aiLabService.getHistory());
    } catch (err) {
      setGenerateError(err instanceof Error ? err.message : 'Generation failed');
      setGenerateStatus('error');
    }
  }, [prompt, generateStatus]);

  const handleTryAgain = useCallback(() => {
    // Re-generate with the same prompt
    if (prompt.trim()) {
      handleGenerate();
    }
  }, [prompt, handleGenerate]);

  const handleSaveToProject = useCallback(async () => {
    if (!currentHistoryId || saveStatus === 'saving') return;

    setSaveStatus('saving');
    setSaveMessage(null);

    try {
      const result = await aiLabService.saveToProject(currentHistoryId);
      if (result.success) {
        setSaveStatus('success');
        setSaveMessage(result.message);
        // Refresh history to show saved status
        setHistory(aiLabService.getHistory());
        // Reset save status after delay
        setTimeout(() => {
          setSaveStatus('idle');
        }, 3000);
      } else {
        setSaveStatus('error');
        setSaveMessage(result.message);
      }
    } catch (err) {
      setSaveStatus('error');
      setSaveMessage(err instanceof Error ? err.message : 'Failed to save');
    }
  }, [currentHistoryId, saveStatus]);

  const handleReset = useCallback(() => {
    setPrompt('');
    setOutput('');
    setCurrentHistoryId(null);
    setGenerateStatus('idle');
    setGenerateError(null);
    setSaveStatus('idle');
    setSaveMessage(null);
  }, []);

  const handleLoadFromHistory = useCallback((item: GenerationHistoryItem) => {
    setPrompt(item.prompt);
    setOutput(item.output);
    setCurrentHistoryId(item.id);
    setGenerateStatus('success');
    setSaveStatus(item.savedToProject ? 'success' : 'idle');
    setSaveMessage(item.savedToProject ? 'Already saved to projects' : null);
    setShowHistory(false);
  }, []);

  const handleDeleteHistoryItem = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    aiLabService.deleteHistoryItem(id);
    setHistory(aiLabService.getHistory());
  }, []);

  const handleClearHistory = useCallback(() => {
    aiLabService.clearHistory();
    setHistory([]);
  }, []);

  const handleViewProjects = useCallback(() => {
    navigate('/projects');
  }, [navigate]);

  const isGenerating = generateStatus === 'generating';
  const isSaving = saveStatus === 'saving';
  const hasSaved = saveStatus === 'success';
  const currentItem = history.find((h) => h.id === currentHistoryId);
  const alreadySaved = currentItem?.savedToProject || false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-6">
            <FloatingMascot size="md" message="Let's create something amazing!" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">AI Lab Playground</h1>
          <p className="text-xl text-gray-600">Experiment with AI and bring your ideas to life!</p>
        </motion.div>

        {/* Safety Indicator + History Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card3D variant="default" hover={false}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Safe Mode: ON</h3>
                  <p className="text-sm text-gray-600">All content is kid-friendly and monitored</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-green-600">Active</span>
                </div>
                <Button3D
                  variant="outline"
                  size="sm"
                  icon={<History className="w-4 h-4" />}
                  onClick={() => setShowHistory(!showHistory)}
                >
                  History ({history.length})
                </Button3D>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* History Panel */}
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card3D variant="default" hover={false}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Recent Generations</h3>
                {history.length > 0 && (
                  <Button3D variant="outline" size="sm" onClick={handleClearHistory}>
                    Clear All
                  </Button3D>
                )}
              </div>
              {history.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No generation history yet</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {history.map((item) => (
                    <motion.div
                      key={item.id}
                      className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                        item.id === currentHistoryId
                          ? 'bg-purple-100 border-2 border-purple-300'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleLoadFromHistory(item)}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{item.prompt}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                          {item.savedToProject && (
                            <span className="ml-2 text-green-600">
                              <Check className="w-3 h-3 inline" /> Saved
                            </span>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                        className="p-2 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card3D>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card3D variant="primary" hover={false}>
              <h2 className="text-2xl font-bold text-white mb-4">Your Prompt</h2>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your idea here... What do you want AI to create?"
                disabled={isGenerating}
                className="w-full h-40 px-6 py-4 rounded-2xl bg-white/20 border-2 border-white/40 text-white placeholder:text-white/60 focus:border-white focus:outline-none transition-all resize-none disabled:opacity-50"
              />

              <div className="flex gap-3 mt-4">
                <Button3D
                  variant="secondary"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  icon={
                    isGenerating ? (
                      <Zap className="w-5 h-5 animate-spin" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )
                  }
                  className="flex-1"
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button3D>
                <Button3D
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  disabled={isGenerating}
                >
                  Reset
                </Button3D>
              </div>
            </Card3D>

            {/* Example Prompts */}
            <Card3D variant="default" hover={false}>
              <h3 className="font-bold text-gray-900 mb-3">Try These Examples:</h3>
              <div className="space-y-2">
                {examples.map((example, i) => (
                  <motion.button
                    key={i}
                    className="w-full text-left px-4 py-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 transition-colors disabled:opacity-50"
                    onClick={() => setPrompt(example)}
                    disabled={isGenerating}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {example}
                  </motion.button>
                ))}
              </div>
            </Card3D>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card3D variant="accent" hover={false} className="h-full">
              <h2 className="text-2xl font-bold text-white mb-4">AI Output</h2>

              <div className="min-h-[300px] p-6 rounded-2xl bg-white/20 border-2 border-white/40 relative">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-white">Generating your content...</p>
                  </div>
                ) : generateStatus === 'error' ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="w-16 h-16 rounded-full bg-red-400/30 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white text-center">{generateError}</p>
                    <Button3D variant="glass" size="sm" onClick={handleGenerate}>
                      Try Again
                    </Button3D>
                  </div>
                ) : output ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white whitespace-pre-wrap"
                  >
                    {output}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/60">
                    <Sparkles className="w-12 h-12 mb-3" />
                    <p className="text-center">Your AI-generated content will appear here!</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {output && generateStatus === 'success' && (
                <motion.div
                  className="space-y-3 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Save Status Message */}
                  {saveMessage && (
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                        saveStatus === 'success'
                          ? 'bg-green-400/20 text-green-100'
                          : 'bg-red-400/20 text-red-100'
                      }`}
                    >
                      {saveStatus === 'success' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      <span className="text-sm">{saveMessage}</span>
                      {saveStatus === 'success' && (
                        <button
                          onClick={handleViewProjects}
                          className="ml-auto text-sm underline hover:no-underline"
                        >
                          View Projects
                        </button>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button3D
                      variant="glass"
                      size="md"
                      className="flex-1"
                      onClick={handleSaveToProject}
                      disabled={isSaving || alreadySaved}
                      icon={
                        isSaving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : hasSaved || alreadySaved ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )
                      }
                    >
                      {isSaving
                        ? 'Saving...'
                        : hasSaved || alreadySaved
                          ? 'Saved!'
                          : 'Save to Projects'}
                    </Button3D>
                    <Button3D
                      variant="glass"
                      size="md"
                      className="flex-1"
                      onClick={handleTryAgain}
                      disabled={isGenerating}
                      icon={<RotateCcw className="w-4 h-4" />}
                    >
                      Try Again
                    </Button3D>
                  </div>
                </motion.div>
              )}
            </Card3D>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card3D variant="default" hover={false}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Pro Tips for Great Prompts:</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Be specific about what you want</li>
                  <li>• Use descriptive words</li>
                  <li>• Try different approaches if you don't like the first result</li>
                  <li>• Have fun and be creative!</li>
                </ul>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </div>
  );
}
