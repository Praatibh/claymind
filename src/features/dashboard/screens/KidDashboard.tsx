/**
 * Kid Dashboard Screen
 * Main dashboard for young learners with progress, modules, and badges
 */

import { motion } from "motion/react";
import { Play, Sparkles, Trophy, Star, Brain, User } from "lucide-react";
import { Card, Button } from "../../../components/ui";

interface KidDashboardProps {
  onContinueLearning: () => void;
  onViewModules: () => void;
  onViewProjects: () => void;
}

export function KidDashboard({ onContinueLearning, onViewModules, onViewProjects }: KidDashboardProps) {
  const badges = [
    { icon: <Star className="w-6 h-6" />, label: "First Steps", unlocked: true },
    { icon: <Brain className="w-6 h-6" />, label: "AI Explorer", unlocked: true },
    { icon: <Sparkles className="w-6 h-6" />, label: "Creative Mind", unlocked: true },
    { icon: <Trophy className="w-6 h-6" />, label: "Champion", unlocked: false },
  ];

  const currentModule = {
    title: "Build an App with AI",
    progress: 60,
    nextLesson: "Creating a Chatbot",
  };

  const stats = [
    { label: "Lessons Completed", value: "24", color: "text-[var(--color-purple-600)]" },
    { label: "Projects Built", value: "8", color: "text-[var(--color-amber-600)]" },
    { label: "Badges Earned", value: "12", color: "text-[var(--color-slate-600)]" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-zinc-50)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="default" padding="lg" className="bg-[var(--color-purple-500)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    Welcome back, Explorer!
                  </h1>
                  <p className="text-white/80">
                    Ready to continue your AI adventure?
                  </p>
                </div>
              </div>
              <div className="text-center bg-white/20 px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-white">Level 8</div>
                <div className="text-sm text-white/80">65% to next</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="default" padding="lg">
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-[var(--color-slate-600)] text-sm">{stat.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Continue Learning Section */}
        <div className="grid lg:grid-cols-3 gap-4">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="default" padding="lg" className="bg-[var(--color-purple-600)]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm text-white/80">Continue Learning</h3>
                    <h2 className="text-xl font-bold text-white">{currentModule.title}</h2>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/90">
                    <span>Progress</span>
                    <span>{currentModule.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[var(--color-amber-400)] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentModule.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-white/20">
                  <p className="text-white/80 text-sm mb-3">
                    <strong>Next:</strong> {currentModule.nextLesson}
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={onContinueLearning}
                    icon={<Play className="w-4 h-4" />}
                  >
                    Continue Learning
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="default" padding="md" clickable onClick={onViewModules}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-purple-100)] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[var(--color-purple-600)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-slate-900)]">Browse Modules</h3>
                  <p className="text-sm text-[var(--color-slate-500)]">Explore new topics</p>
                </div>
              </div>
            </Card>

            <Card variant="default" padding="md" clickable onClick={onViewProjects}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-amber-100)] flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-[var(--color-amber-600)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-slate-900)]">My Projects</h3>
                  <p className="text-sm text-[var(--color-slate-500)]">View your creations</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="default" padding="lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[var(--color-slate-900)]">Your Badges</h2>
                <span className="text-[var(--color-purple-600)] text-sm">12 / 20 Unlocked</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {badges.map((badge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className={`text-center p-4 rounded-xl ${badge.unlocked ? 'bg-[var(--color-zinc-100)]' : 'bg-[var(--color-slate-100)] opacity-50'}`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${badge.unlocked ? 'bg-[var(--color-amber-500)] text-white' : 'bg-[var(--color-slate-300)] text-[var(--color-slate-500)]'}`}>
                      {badge.icon}
                    </div>
                    <p className="text-sm font-medium text-[var(--color-slate-700)]">{badge.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="default" padding="lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-amber-500)] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-slate-900)] mb-1">
                    Daily Challenge: Build a Simple Classifier
                  </h3>
                  <p className="text-[var(--color-slate-600)] text-sm">
                    Complete today's challenge to earn bonus points!
                  </p>
                </div>
              </div>
              <Button variant="primary" size="md">
                Start Challenge
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
