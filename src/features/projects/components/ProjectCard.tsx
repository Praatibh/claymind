/**
 * ProjectCard Component
 * Displays a single project with thumbnail, info, and action buttons
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Image, Video, Sparkles, FileText, Share2, Eye, Loader2, Check } from 'lucide-react';
import { Card, Button } from '../../../components/ui';
import type { Project } from '../../../lib/types/api';

interface ProjectCardProps {
  project: Project;
  index?: number;
  onView: (projectId: string) => void;
  onShare: (projectId: string) => Promise<boolean>;
}

const TYPE_ICONS = {
  Image: Image,
  Video: Video,
  App: Sparkles,
  Other: FileText,
} as const;

const TYPE_COLORS: Record<string, string> = {
  Image: 'bg-[var(--color-slate-500)]',
  Video: 'bg-[var(--color-purple-500)]',
  App: 'bg-[var(--color-purple-600)]',
  Other: 'bg-[var(--color-slate-400)]',
};

export function ProjectCard({ project, index = 0, onView, onShare }: ProjectCardProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const IconComponent = TYPE_ICONS[project.type] || FileText;
  const colorClass = TYPE_COLORS[project.type] || TYPE_COLORS.Other;

  const handleShare = async () => {
    if (isSharing || shareSuccess) return;

    setIsSharing(true);
    try {
      const success = await onShare(project.id);
      if (success) {
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleView = () => {
    onView(project.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card variant="default" padding="none" className="overflow-hidden">
        {/* Thumbnail */}
        <div className="relative h-40 bg-[var(--color-zinc-100)]">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <IconComponent className="w-12 h-12 text-[var(--color-slate-300)]" />
            </div>
          )}
          <div className="absolute top-3 right-3">
            <div
              className={`px-2.5 py-1 rounded-md ${colorClass} text-white text-xs flex items-center gap-1`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{project.type}</span>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-[var(--color-slate-900)] mb-1 truncate" title={project.title}>
              {project.title}
            </h3>
            <p className="text-sm text-[var(--color-slate-500)]">Created {project.date}</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={handleView}
              icon={<Eye className="w-4 h-4" />}
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleShare}
              disabled={isSharing}
            >
              {isSharing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : shareSuccess ? (
                <>
                  <Check className="w-4 h-4 mr-1 text-[var(--color-purple-500)]" />
                  <span className="text-[var(--color-purple-600)]">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
