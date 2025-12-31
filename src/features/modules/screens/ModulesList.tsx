/**
 * ModulesList Screen
 * Displays all learning modules with progress tracking
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Brain, Sparkles, Image, Video, Lock, Star, Play } from 'lucide-react';
import { Card3D } from '../../../app/components/3d-card';
import { Button3D } from '../../../app/components/3d-button';
import { LoadingState as LoadingStateUI, ErrorState } from '../../../components/ui';
import { modulesService } from '../../../lib/services/modules.service';
import type { Module } from '../../../lib/types/api';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-12 h-12" />,
  Sparkles: <Sparkles className="w-12 h-12" />,
  Image: <Image className="w-12 h-12" />,
  Video: <Video className="w-12 h-12" />,
};

export function Modules() {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      setLoadingState('loading');
      setError(null);

      const data = await modulesService.getModules();
      setModules(data);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load modules');
      setLoadingState('error');
    }
  };

  const handleModuleClick = useCallback(
    (moduleId: string) => {
      navigate(`/modules/${moduleId}`);
    },
    [navigate]
  );

  const handleStartModule = useCallback(
    (e: React.MouseEvent, moduleId: string) => {
      e.stopPropagation();
      navigate(`/modules/${moduleId}`);
    },
    [navigate]
  );

  const getModuleIcon = (moduleId: string): React.ReactNode => {
    const iconName = modulesService.getModuleIcon(moduleId);
    return ICON_MAP[iconName] || <Brain className="w-12 h-12" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Learning Modules</h1>
          <p className="text-xl text-gray-600">Choose your path and start learning AI!</p>
        </motion.div>

        {/* Loading State */}
        {loadingState === 'loading' && (
          <LoadingStateUI message="Loading modules..." size="lg" />
        )}

        {/* Error State */}
        {loadingState === 'error' && (
          <ErrorState
            title="Couldn't load modules"
            message={error || 'Something went wrong'}
            onRetry={loadModules}
            icon={<Brain className="w-8 h-8 text-red-500" />}
          />
        )}

        {/* Modules Grid */}
        {loadingState === 'success' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, i) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card3D
                  variant="default"
                  locked={module.locked}
                  onClick={!module.locked ? () => handleModuleClick(module.id) : undefined}
                  className="h-full flex flex-col"
                >
                  {/* Module Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-${module.color}-400 to-${module.color}-500 flex items-center justify-center text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex-shrink-0`}
                    >
                      {getModuleIcon(module.id)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{module.title}</h3>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < module.difficulty
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 flex-1">{module.description}</p>

                  {/* Module Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>{module.lessons} lessons</span>
                    <span>•</span>
                    <span>{module.duration}</span>
                  </div>

                  {/* Progress Bar - Always show for unlocked modules */}
                  {!module.locked && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r from-${module.color}-400 to-${module.color}-500 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${module.progress}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {module.locked ? (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm">Unlock by completing previous modules</span>
                    </div>
                  ) : (
                    <Button3D
                      variant={module.progress > 0 ? 'primary' : 'outline'}
                      size="md"
                      icon={<Play className="w-4 h-4" />}
                      className="w-full"
                      onClick={(e) => handleStartModule(e, module.id)}
                    >
                      {module.progress === 0
                        ? 'Start Module'
                        : module.progress === 100
                          ? 'Review'
                          : 'Continue'}
                    </Button3D>
                  )}
                </Card3D>
              </motion.div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card3D variant="accent" hover={false}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Need help choosing?</h3>
                <p className="text-white/90">
                  Start with "AI Basics" if you're new, or jump into any unlocked module!
                </p>
              </div>
              <Button3D variant="glass" size="lg">
                Get Recommendations
              </Button3D>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </div>
  );
}
