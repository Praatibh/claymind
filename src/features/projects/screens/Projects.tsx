/**
 * Projects Screen
 * Displays user's projects with stats, grid view, and action buttons
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trophy, Plus, FolderOpen, Loader2 } from 'lucide-react';
import { Card, Button, LoadingState as LoadingStateUI, ErrorState, EmptyState } from '../../../components/ui';
import { ProjectCard } from '../components/ProjectCard';
import {
  projectsService,
  type ProjectsStats,
} from '../../../lib/services/projects.service';
import type { Project } from '../../../lib/types/api';

type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<ProjectsStats>({ total: 0, thisMonth: 0, shared: 0 });
  const [loadingState, setLoadingState] = useState<LoadingStatus>('loading');
  const [error, setError] = useState<string | null>(null);

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoadingState('loading');
      setError(null);

      const data = await projectsService.getProjects();
      setProjects(data);
      setStats(projectsService.calculateStats(data));
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
      setLoadingState('error');
    }
  };

  const handleNewProject = useCallback(() => {
    navigate('/ai-lab?mode=create');
  }, [navigate]);

  const handleViewProject = useCallback(
    (projectId: string) => {
      navigate(`/ai-lab?project=${projectId}`);
    },
    [navigate]
  );

  const handleShareProject = useCallback(async (projectId: string): Promise<boolean> => {
    return projectsService.copyShareLink(projectId);
  }, []);

  const statsDisplay = [
    { label: 'Total Projects', value: stats.total, color: 'text-[var(--color-purple-600)]' },
    { label: 'This Month', value: stats.thisMonth, color: 'text-[var(--color-amber-600)]' },
    { label: 'Shared', value: stats.shared, color: 'text-[var(--color-slate-600)]' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-zinc-50)] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-[var(--color-amber-500)] flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-slate-900)] mb-2">My Projects</h1>
          <p className="text-lg text-[var(--color-slate-600)]">Your collection of AI creations</p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          {statsDisplay.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="default" padding="lg">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                    {loadingState === 'loading' ? (
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-[var(--color-slate-600)] text-sm">{stat.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[var(--color-slate-900)]">All Projects</h2>
            <Button variant="primary" size="md" onClick={handleNewProject} icon={<Plus className="w-4 h-4" />}>
              New Project
            </Button>
          </div>

          {/* Loading State */}
          {loadingState === 'loading' && (
            <LoadingStateUI message="Loading your projects..." size="lg" />
          )}

          {/* Error State */}
          {loadingState === 'error' && (
            <ErrorState
              title="Couldn't load projects"
              message={error || 'Something went wrong'}
              onRetry={loadProjects}
              icon={<FolderOpen className="w-8 h-8 text-[var(--color-error)]" />}
            />
          )}

          {/* Empty State */}
          {loadingState === 'success' && projects.length === 0 && (
            <EmptyState
              title="No projects yet"
              message="Start your AI adventure by creating your first project!"
              onAction={handleNewProject}
              actionText="Create Your First Project"
              actionIcon={<Plus className="w-5 h-5" />}
              icon={<FolderOpen className="w-10 h-10 text-[var(--color-purple-500)]" />}
            />
          )}

          {/* Projects Grid */}
          {loadingState === 'success' && projects.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onView={handleViewProject}
                  onShare={handleShareProject}
                />
              ))}
            </div>
          )}
        </div>

        {/* Encouragement Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="default" padding="lg" className="text-center bg-[var(--color-purple-500)]">
            <h3 className="text-xl font-bold text-white mb-2">Keep Creating!</h3>
            <p className="text-white/90 mb-4">
              What will you create next?
            </p>
            <Button variant="secondary" size="md" onClick={handleNewProject} icon={<Plus className="w-4 h-4" />}>
              Start New Project
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
