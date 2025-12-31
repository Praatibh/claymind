/**
 * LessonPlayer Screen
 * Interactive lesson player with content, quizzes, and progress tracking
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Star,
  Trophy,
  Sparkles,
  Loader2,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Button3D } from '../../../app/components/3d-button';
import { Card3D } from '../../../app/components/3d-card';
import { FloatingMascot } from '../../../app/components/floating-mascot';
import { triggerConfetti } from '../../../app/utils/confetti-effects';
import { soundManager } from '../../../app/utils/haptics-sound';
import { modulesService } from '../../../lib/services/modules.service';
import { LoadingState, ErrorState } from '../../../components/ui';
import { getAIBasicsLesson } from '../../../lib/data/lessons/ai-basics';
import type { LessonSlide as AIBasicsLessonSlide } from '../../../lib/data/lessons/ai-basics';
import { getMLMiniLesson } from '../../../lib/data/lessons/ml-mini';
import type { MLMiniLessonSlide } from '../../../lib/data/lessons/ml-mini';

interface LessonContent {
  id: string;
  type: 'intro' | 'content' | 'video' | 'quiz' | 'activity' | 'recap' | 'completion';
  title?: string;
  subtitle?: string;
  text?: string;
  bulletPoints?: string[];
  image?: string;
  video?: string;
  videoTitle?: string;
  videoDuration?: string;
  quiz?: QuizQuestion;
  tips?: string[];
  funFact?: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export function LessonPlayer() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isReviewMode = searchParams.get('mode') === 'review';

  const [loadingState, setLoadingState] = useState<LoadingStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [lessonContent, setLessonContent] = useState<LessonContent[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);

  useEffect(() => {
    if (moduleId && lessonId) {
      loadLesson(moduleId, lessonId);
    }
  }, [moduleId, lessonId]);

  const loadLesson = async (modId: string, lessId: string) => {
    try {
      setLoadingState('loading');
      setError(null);

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Load real lesson content based on module
      let content: LessonContent[] = [];

      if (modId === 'ai-basics') {
        const lessonData = getAIBasicsLesson(lessId);
        if (lessonData) {
          // Convert AI Basics lesson format to LessonContent format
          content = lessonData.slides.map((slide: AIBasicsLessonSlide) => ({
            id: slide.id,
            type: slide.type,
            title: slide.title,
            text: slide.text,
            bulletPoints: slide.bulletPoints,
            image: slide.image,
            video: slide.videoUrl,
            quiz: slide.quiz,
            funFact: slide.funFact,
            subtitle: slide.subtitle,
            tips: slide.tips,
          })) as LessonContent[];
        } else {
          // Fallback to generic content if lesson not found
          content = generateLessonContent(lessId);
        }
      } else if (modId === 'ml-mini') {
        const lessonData = getMLMiniLesson(lessId);
        if (lessonData) {
          // Convert ML Mini lesson format to LessonContent format
          content = lessonData.slides.map((slide: MLMiniLessonSlide) => ({
            id: slide.id,
            type: slide.type,
            title: slide.title,
            text: slide.text,
            bulletPoints: slide.bulletPoints,
            image: slide.image,
            video: slide.videoUrl,
            quiz: slide.quiz,
            funFact: slide.funFact,
            subtitle: slide.subtitle,
            tips: slide.tips,
          })) as LessonContent[];
        } else {
          // Fallback to generic content if lesson not found
          content = generateLessonContent(lessId);
        }
      } else {
        // For other modules, use generic content for now
        content = generateLessonContent(lessId);
      }

      setLessonContent(content);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lesson');
      setLoadingState('error');
    }
  };

  const generateLessonContent = (lessId: string): LessonContent[] => {
    // Generate dynamic kid-friendly lesson content
    return [
      {
        id: '1',
        type: 'intro',
        title: `🎉 Lesson ${lessId}: Let's Learn Something Cool!`,
        text: `Hey there, AI Explorer! Ready to discover something amazing? This lesson is packed with fun stuff that'll make you an AI pro! Let's dive in! 🚀`,
      },
      {
        id: '2',
        type: 'content',
        title: '🧠 What is AI?',
        text: `Artificial Intelligence (AI) is like giving computers a brain! Just like you can learn and solve problems, AI helps computers do the same thing. Pretty cool, right?`,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      },
      {
        id: '3',
        type: 'content',
        title: '🎮 How Does AI Work?',
        text: `AI learns from examples! Imagine teaching a robot to recognize cats. You show it thousands of cat pictures, and it learns what makes a cat a cat. Whiskers? ✅ Pointy ears? ✅ That's how AI learns!`,
        video: 'https://www.youtube.com/embed/aircAruvnKk',
      },
      {
        id: '4',
        type: 'quiz',
        quiz: {
          question: '🤔 What does AI stand for?',
          options: [
            'Awesome Intelligence',
            'Artificial Intelligence',
            'Amazing Information',
            'Automatic Ideas',
          ],
          correctAnswer: 1,
          explanation: `Great job! AI stands for Artificial Intelligence! It's the science of making computers smart! 🎯`,
        },
      },
      {
        id: '5',
        type: 'content',
        title: '🌟 Real-World AI Examples',
        text: `AI is everywhere! Your phone's voice assistant? That's AI! YouTube recommendations? AI again! Even video game characters use AI to play against you. Cool, right? 🎮`,
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      },
      {
        id: '6',
        type: 'quiz',
        quiz: {
          question: '🎯 Which of these uses AI?',
          options: [
            'Netflix movie recommendations',
            'A regular calculator',
            'A paper book',
            'A wooden chair',
          ],
          correctAnswer: 0,
          explanation: `Awesome! Netflix uses AI to suggest movies you might like based on what you've watched before! 🎬`,
        },
      },
      {
        id: '7',
        type: 'completion',
        title: '🎊 You Did It!',
        text: `Amazing work! You just completed the lesson! You're one step closer to becoming an AI master! Ready for the next challenge? 🚀`,
      },
    ];
  };

  const handleNext = useCallback(() => {
    const currentContent = lessonContent[currentSlide];

    if (currentContent.type === 'quiz' && !showResult) {
      // Check quiz answer
      if (selectedAnswer === null) {
        soundManager.play('error');
        return;
      }

      setShowResult(true);
      const isCorrect = selectedAnswer === currentContent.quiz!.correctAnswer;

      if (isCorrect) {
        setScore((prev) => prev + 1);
        soundManager.play('success');
        triggerConfetti();
      } else {
        soundManager.play('error');
      }

      setQuestionsAnswered((prev) => prev + 1);
      return;
    }

    if (currentSlide < lessonContent.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      soundManager.play('click');
    } else {
      handleCompleteLesson();
    }
  }, [currentSlide, lessonContent, selectedAnswer, showResult]);

  const handlePrevious = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
      soundManager.play('click');
    }
  }, [currentSlide]);

  const handleCompleteLesson = async () => {
    if (!moduleId || !lessonId || isCompleting) return;

    setIsCompleting(true);
    try {
      await modulesService.completeLesson(moduleId, lessonId);

      // Show completion celebration
      triggerConfetti();
      soundManager.play('levelUp');

      // Navigate back to module detail after short delay
      setTimeout(() => {
        navigate(`/modules/${moduleId}`);
      }, 2000);
    } catch (err) {
      setIsCompleting(false);
    }
  };

  const handleExit = useCallback(() => {
    navigate(`/modules/${moduleId}`);
  }, [moduleId, navigate]);

  const currentContent = lessonContent[currentSlide];
  const progress = ((currentSlide + 1) / lessonContent.length) * 100;

  if (loadingState === 'loading') {
    return <LoadingState message="Loading your lesson..." size="lg" />;
  }

  if (loadingState === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <ErrorState
          title="Oops! Couldn't load the lesson"
          message={error || 'Something went wrong'}
          onRetry={() => moduleId && lessonId && loadLesson(moduleId, lessonId)}
        />
      </div>
    );
  }

  if (!currentContent) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button3D variant="outline" size="sm" onClick={handleExit} icon={<ChevronLeft className="w-4 h-4" />}>
            Exit Lesson
          </Button3D>

          {isReviewMode && (
            <span className="bg-amber-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
              📖 Review Mode
            </span>
          )}

          <div className="flex items-center gap-4">
            <button
              onClick={() => setAudioMuted(!audioMuted)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
            >
              {audioMuted ? <VolumeX className="w-5 h-5 text-gray-600" /> : <Volume2 className="w-5 h-5 text-purple-600" />}
            </button>

            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="font-bold text-gray-900">{score} / {questionsAnswered}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Lesson Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card3D variant="default" hover={false} className="p-8 md:p-12">
              {/* Intro Slide */}
              {currentContent.type === 'intro' && (
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-6">
                      <Sparkles className="w-12 h-12 text-white fill-white" />
                    </div>
                  </motion.div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{currentContent.title}</h1>
                  {currentContent.subtitle && (
                    <h2 className="text-xl font-semibold text-purple-600">{currentContent.subtitle}</h2>
                  )}
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">{currentContent.text}</p>

                  {/* Tips */}
                  {currentContent.tips && currentContent.tips.length > 0 && (
                    <div className="bg-blue-50 rounded-2xl p-6 max-w-2xl mx-auto">
                      <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Quick Tips:
                      </h3>
                      <ul className="space-y-2">
                        {currentContent.tips.map((tip, idx) => (
                          <li key={idx} className="text-blue-800 flex items-start gap-2">
                            <span className="text-blue-500">💡</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <FloatingMascot size="lg" message="Let's learn together! This is gonna be fun!" />
                </div>
              )}

              {/* Content Slide */}
              {currentContent.type === 'content' && (
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{currentContent.title}</h2>

                  {currentContent.text && (
                    <p className="text-lg text-gray-700 leading-relaxed">{currentContent.text}</p>
                  )}

                  {/* Bullet Points */}
                  {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                    <ul className="space-y-3">
                      {currentContent.bulletPoints.map((point, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-3 text-lg text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <span className="text-purple-500 text-2xl leading-none">•</span>
                          <span className="flex-1" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {currentContent.image && (
                    <motion.img
                      src={currentContent.image}
                      alt="Lesson visual"
                      className="w-full rounded-2xl shadow-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                  )}

                  {/* Fun Fact */}
                  {currentContent.funFact && (
                    <motion.div
                      className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-amber-900 font-medium">{currentContent.funFact}</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Video Slide */}
              {currentContent.type === 'video' && (
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{currentContent.title}</h2>

                  {currentContent.text && (
                    <p className="text-lg text-gray-700 leading-relaxed">{currentContent.text}</p>
                  )}

                  {currentContent.video && (
                    <div className="space-y-3">
                      {currentContent.videoTitle && (
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-gray-800">{currentContent.videoTitle}</h3>
                          {currentContent.videoDuration && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              ⏱️ {currentContent.videoDuration}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                        <iframe
                          src={currentContent.video}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={currentContent.videoTitle || 'Educational video'}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recap Slide */}
              {currentContent.type === 'recap' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-white fill-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{currentContent.title}</h2>
                    {currentContent.subtitle && (
                      <p className="text-lg text-gray-600 mt-2">{currentContent.subtitle}</p>
                    )}
                  </div>

                  {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 && (
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {currentContent.bulletPoints.map((point, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start gap-3 text-lg text-gray-800"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="text-green-500 text-2xl leading-none">✓</span>
                            <span className="flex-1">{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentContent.funFact && (
                    <motion.div
                      className="bg-amber-100 border-2 border-amber-400 p-4 rounded-xl text-center"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                    >
                      <p className="text-amber-900 font-bold text-lg">{currentContent.funFact}</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Quiz Slide */}
              {currentContent.type === 'quiz' && currentContent.quiz && (
                <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{currentContent.quiz.question}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentContent.quiz.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrect = index === currentContent.quiz!.correctAnswer;
                      const showCorrect = showResult && isCorrect;
                      const showWrong = showResult && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={index}
                          onClick={() => !showResult && setSelectedAnswer(index)}
                          disabled={showResult}
                          className={`p-6 rounded-2xl text-left font-semibold text-lg transition-all ${
                            showCorrect
                              ? 'bg-green-500 text-white ring-4 ring-green-300'
                              : showWrong
                                ? 'bg-red-500 text-white ring-4 ring-red-300'
                                : isSelected
                                  ? 'bg-purple-500 text-white ring-4 ring-purple-300'
                                  : 'bg-white hover:bg-purple-50 hover:ring-2 hover:ring-purple-200'
                          } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          whileHover={!showResult ? { scale: 1.02 } : {}}
                          whileTap={!showResult ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {showCorrect && <Check className="w-6 h-6" />}
                            {showWrong && <X className="w-6 h-6" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-2xl ${
                        selectedAnswer === currentContent.quiz.correctAnswer
                          ? 'bg-green-100 border-2 border-green-400'
                          : 'bg-amber-100 border-2 border-amber-400'
                      }`}
                    >
                      <p className="text-lg font-semibold text-gray-900">{currentContent.quiz.explanation}</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Completion Slide */}
              {currentContent.type === 'completion' && (
                <div className="text-center space-y-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-6 shadow-2xl">
                      <Trophy className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>

                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{currentContent.title}</h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">{currentContent.text}</p>

                  {/* Completion Rewards */}
                  {currentContent.bulletPoints && currentContent.bulletPoints.length > 0 ? (
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 max-w-2xl mx-auto">
                      {currentContent.bulletPoints.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="text-lg font-semibold text-gray-800 mb-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.2 }}
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-4 justify-center">
                      <div className="bg-purple-100 px-6 py-3 rounded-full">
                        <span className="text-2xl font-bold text-purple-600">+50 XP</span>
                      </div>
                      <div className="bg-amber-100 px-6 py-3 rounded-full">
                        <span className="text-2xl font-bold text-amber-600">{score} / {questionsAnswered} Correct!</span>
                      </div>
                    </div>
                  )}

                  <FloatingMascot size="lg" message="You're amazing! Keep up the great work!" />
                </div>
              )}
            </Card3D>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button3D
            variant="outline"
            size="md"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            icon={<ChevronLeft className="w-5 h-5" />}
          >
            Previous
          </Button3D>

          <span className="text-sm text-gray-600 font-medium">
            {currentSlide + 1} / {lessonContent.length}
          </span>

          {currentSlide < lessonContent.length - 1 ? (
            <Button3D
              variant="accent"
              size="md"
              onClick={handleNext}
              iconRight={<ChevronRight className="w-5 h-5" />}
              disabled={currentContent.type === 'quiz' && selectedAnswer === null && !showResult}
              glow={true}
              pulse={currentContent.type === 'quiz' && showResult}
            >
              {currentContent.type === 'quiz' && !showResult ? 'Check Answer' : 'Next'}
            </Button3D>
          ) : (
            <Button3D
              variant="fun"
              size="md"
              onClick={handleCompleteLesson}
              disabled={isCompleting}
              icon={isCompleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trophy className="w-5 h-5" />}
              glow={true}
              shine={true}
            >
              {isCompleting ? 'Completing...' : 'Complete Lesson! 🎉'}
            </Button3D>
          )}
        </div>
      </div>
    </div>
  );
}
