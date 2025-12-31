/**
 * ModuleDetail Screen
 * Displays module lessons with progress tracking and locked lesson logic
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Check, Lock, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { Card3D } from '../../../app/components/3d-card';
import { Button3D } from '../../../app/components/3d-button';
import { FloatingMascot } from '../../../app/components/floating-mascot';
import { LoadingState as LoadingStateUI, ErrorState } from '../../../components/ui';
import { modulesService } from '../../../lib/services/modules.service';
import type { ModuleDetail as ModuleDetailType } from '../../../lib/types/api';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export function ModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const [moduleData, setModuleData] = useState<ModuleDetailType | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [startingLesson, setStartingLesson] = useState<string | null>(null);

  useEffect(() => {
    if (moduleId) {
      loadModuleDetail(moduleId);
    }
  }, [moduleId]);

  const loadModuleDetail = async (id: string) => {
    try {
      setLoadingState('loading');
      setError(null);

      const data = await modulesService.getModuleDetail(id);
      setModuleData(data);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load module');
      setLoadingState('error');
    }
  };

  const handleBack = useCallback(() => {
    navigate('/modules');
  }, [navigate]);

  const handleStartLesson = useCallback(
    async (lessonId: string) => {
      if (!moduleId || startingLesson) return;

      setStartingLesson(lessonId);
      try {
        await modulesService.startLesson(moduleId, lessonId);
        // Navigate to lesson player
        navigate(`/modules/${moduleId}/lesson/${lessonId}`);
      } catch (err) {
        // Handle error silently - user can retry
        setStartingLesson(null);
      }
    },
    [moduleId, navigate, startingLesson]
  );

  const handleReviewLesson = useCallback(
    async (lessonId: string) => {
      if (!moduleId || startingLesson) return;

      setStartingLesson(lessonId);
      try {
        await modulesService.reviewLesson(moduleId, lessonId);
        // Navigate to lesson player in review mode
        navigate(`/modules/${moduleId}/lesson/${lessonId}?mode=review`);
      } catch (err) {
        setStartingLesson(null);
      }
    },
    [moduleId, navigate, startingLesson]
  );

  const handleOpenAILab = useCallback(() => {
    navigate('/ai-lab');
  }, [navigate]);

  // Calculate current lesson
  const currentLessonId = moduleData?.lessons
    ? modulesService.getCurrentLessonId(moduleData.lessons)
    : null;

  const completedLessons = moduleData?.lessons?.filter((l) => l.completed).length ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Button */}
        <motion.button
          onClick={handleBack}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          whileHover={{ x: -5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back to Modules
        </motion.button>

        {/* Loading State */}
        {loadingState === 'loading' && (
          <LoadingStateUI message="Loading module..." size="lg" />
        )}

        {/* Error State */}
        {loadingState === 'error' && (
          <ErrorState
            title="Couldn't load module"
            message={error || 'Something went wrong'}
            onRetry={() => moduleId && loadModuleDetail(moduleId)}
            icon={<Sparkles className="w-8 h-8 text-red-500" />}
          />
        )}

        {/* Module Content */}
        {loadingState === 'success' && moduleData && (
          <>
            {/* Module Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <Card3D variant="primary" hover={false}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                      {moduleData.title}
                    </h1>
                    <p className="text-white/90 text-lg mb-4">{moduleData.description}</p>
                    <div className="flex items-center gap-4 text-white/90">
                      <span>
                        {completedLessons} / {moduleData.totalLessons} lessons completed
                      </span>
                      <span>•</span>
                      <span>{moduleData.progress}% complete</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <FloatingMascot size="md" message="You're doing great! Keep going!" />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-300 to-amber-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${moduleData.progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </Card3D>
            </motion.div>

            {/* Lessons List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Lessons</h2>

              {moduleData.lessons.map((lesson, i) => {
                const isCurrent = lesson.id === currentLessonId;
                const isStarting = startingLesson === lesson.id;

                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card3D
                      variant={isCurrent ? 'accent' : 'default'}
                      locked={lesson.locked}
                      onClick={
                        !lesson.locked && !isStarting
                          ? () =>
                              lesson.completed
                                ? handleReviewLesson(lesson.id)
                                : handleStartLesson(lesson.id)
                          : undefined
                      }
                      className={isCurrent ? 'border-4 border-amber-300' : ''}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          {/* Status Icon */}
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              lesson.completed
                                ? 'bg-gradient-to-br from-green-400 to-green-500 text-white'
                                : lesson.locked
                                  ? 'bg-gray-300 text-gray-500'
                                  : isCurrent
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gradient-to-br from-purple-400 to-purple-500 text-white'
                            }`}
                          >
                            {lesson.completed ? (
                              <Check className="w-6 h-6" />
                            ) : lesson.locked ? (
                              <Lock className="w-5 h-5" />
                            ) : (
                              <Play className="w-6 h-6" />
                            )}
                          </div>

                          {/* Lesson Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3
                                className={`font-bold ${
                                  isCurrent
                                    ? 'text-white text-lg'
                                    : lesson.locked
                                      ? 'text-gray-400'
                                      : 'text-gray-900'
                                }`}
                              >
                                Lesson {lesson.id}: {lesson.title}
                              </h3>
                              {isCurrent && (
                                <span className="bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-sm">
                                  Current
                                </span>
                              )}
                            </div>
                            <p
                              className={
                                isCurrent
                                  ? 'text-white/90'
                                  : lesson.locked
                                    ? 'text-gray-400'
                                    : 'text-gray-600'
                              }
                            >
                              {lesson.duration}
                            </p>
                          </div>
                        </div>

                        {/* Action Button */}
                        {!lesson.locked && !lesson.completed && (
                          <Button3D
                            variant={isCurrent ? 'secondary' : 'primary'}
                            size="md"
                            icon={
                              isStarting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )
                            }
                            disabled={isStarting}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartLesson(lesson.id);
                            }}
                          >
                            {isStarting ? 'Loading...' : isCurrent ? 'Continue' : 'Start'}
                          </Button3D>
                        )}
                        {lesson.completed && (
                          <Button3D
                            variant="outline"
                            size="md"
                            disabled={isStarting}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReviewLesson(lesson.id);
                            }}
                          >
                            {isStarting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              'Review'
                            )}
                          </Button3D>
                        )}
                      </div>
                    </Card3D>
                  </motion.div>
                );
              })}
            </div>

            {/* Practice Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card3D variant="gradient" hover={false}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white fill-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Ready to Practice?</h3>
                      <p className="text-white/90">
                        Try the AI Lab to experiment with what you've learned!
                      </p>
                    </div>
                  </div>
                  <Button3D variant="glass" size="lg" onClick={handleOpenAILab}>
                    Open AI Lab
                  </Button3D>
                </div>
              </Card3D>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
