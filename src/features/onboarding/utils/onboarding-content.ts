/**
 * Onboarding Content Configuration
 * Role-specific tutorial and welcome content for the onboarding flow
 */

import type { UserRole } from '../../../lib/utils/rbac';
import { Brain, Trophy, Sparkles, TrendingUp, Eye, Shield, BarChart, Bell, Users, BookOpen, Edit, Settings, Activity, CheckCircle, Rocket, Target, Link as LinkIcon, UserPlus } from 'lucide-react';

export interface TutorialFeature {
  icon: any;
  title: string;
  description: string;
}

export interface TutorialContent {
  title: string;
  subtitle: string;
  features: TutorialFeature[];
  primaryCTA: string;
  skipCTA: string;
}

export const TUTORIAL_CONTENT: Record<UserRole, TutorialContent> = {
  student: {
    title: "Your AI Learning Adventure Awaits!",
    subtitle: "Discover everything you can do on ClayMind",
    features: [
      {
        icon: Brain,
        title: "Interactive Lessons",
        description: "Learn AI through fun, hands-on projects and challenges"
      },
      {
        icon: Trophy,
        title: "Earn Badges & Rewards",
        description: "Unlock achievements and level up as you learn"
      },
      {
        icon: Sparkles,
        title: "AI Lab Playground",
        description: "Create your own AI projects and bring ideas to life"
      },
      {
        icon: TrendingUp,
        title: "Track Your Progress",
        description: "See your learning streaks, levels, and accomplishments"
      }
    ],
    primaryCTA: "Start Learning",
    skipCTA: "Skip Tutorial"
  },

  parent: {
    title: "Welcome to Your Parent Dashboard",
    subtitle: "Everything you need to support your child's AI learning journey",
    features: [
      {
        icon: Eye,
        title: "Monitor Progress",
        description: "Track lessons completed, time spent, and skills developed"
      },
      {
        icon: Shield,
        title: "Safety Controls",
        description: "Content filtering, time limits, and activity monitoring"
      },
      {
        icon: BarChart,
        title: "Weekly Reports",
        description: "Get insights into your child's learning patterns and achievements"
      },
      {
        icon: Bell,
        title: "Stay Connected",
        description: "Receive notifications about milestones and new content"
      }
    ],
    primaryCTA: "View Dashboard",
    skipCTA: "Skip Tutorial"
  },

  teacher: {
    title: "Empower Your Classroom with AI",
    subtitle: "Tools to teach, track, and inspire your students",
    features: [
      {
        icon: Users,
        title: "Manage Students",
        description: "Track progress for all your learners in one place"
      },
      {
        icon: BookOpen,
        title: "Assign Lessons",
        description: "Curate learning paths and assign specific modules"
      },
      {
        icon: BarChart,
        title: "Class Analytics",
        description: "View overall performance and identify learning gaps"
      },
      {
        icon: Edit,
        title: "Create Content",
        description: "Build custom lessons and activities for your students"
      }
    ],
    primaryCTA: "Explore Dashboard",
    skipCTA: "Skip Tutorial"
  },

  admin: {
    title: "Admin Control Center",
    subtitle: "Platform management and oversight tools",
    features: [
      {
        icon: Settings,
        title: "System Management",
        description: "Configure platform settings and feature flags"
      },
      {
        icon: Users,
        title: "User Management",
        description: "Manage accounts, roles, and permissions"
      },
      {
        icon: BarChart,
        title: "Platform Analytics",
        description: "View system-wide metrics and usage statistics"
      },
      {
        icon: Shield,
        title: "Content Moderation",
        description: "Review and approve user-generated content"
      }
    ],
    primaryCTA: "Access Admin Panel",
    skipCTA: "Skip Tutorial"
  }
};

export interface WelcomeNextStep {
  icon: any;
  text: string;
}

export interface WelcomeContent {
  title: string;
  message: string;
  nextSteps: WelcomeNextStep[];
  primaryAction: {
    label: string;
    path: string;
  };
  secondaryAction?: {
    label: string;
    path: string;
  };
}

export const WELCOME_CONTENT: Record<UserRole, WelcomeContent> = {
  student: {
    title: "You're All Set!",
    message: "Your AI learning adventure starts now. Here's what to do next:",
    nextSteps: [
      { icon: Rocket, text: "Explore the AI Lab and create your first project" },
      { icon: BookOpen, text: "Start the 'AI Basics' module" },
      { icon: Users, text: "Check out what other students are building" }
    ],
    primaryAction: {
      label: "Go to Dashboard",
      path: "/kid-dashboard"
    },
    secondaryAction: {
      label: "Explore Modules",
      path: "/modules"
    }
  },

  parent: {
    title: "Welcome Aboard!",
    message: "You're ready to support your child's AI learning journey:",
    nextSteps: [
      { icon: LinkIcon, text: "Link your child's account (if not done)" },
      { icon: Shield, text: "Set up safety preferences" },
      { icon: BookOpen, text: "Review available learning modules" },
      { icon: Target, text: "Set weekly learning goals" }
    ],
    primaryAction: {
      label: "Go to Dashboard",
      path: "/parent-dashboard"
    }
  },

  teacher: {
    title: "Ready to Inspire!",
    message: "Your classroom is set up. Here's how to get started:",
    nextSteps: [
      { icon: Users, text: "Create your first class" },
      { icon: UserPlus, text: "Add students or send invite links" },
      { icon: BookOpen, text: "Browse the lesson library" },
      { icon: Edit, text: "Customize your first assignment" }
    ],
    primaryAction: {
      label: "Go to Dashboard",
      path: "/kid-dashboard"
    }
  },

  admin: {
    title: "Admin Access Granted",
    message: "Platform management tools are ready:",
    nextSteps: [
      { icon: Activity, text: "Review system health" },
      { icon: CheckCircle, text: "Check pending content approvals" },
      { icon: BarChart, text: "View user analytics" },
      { icon: Settings, text: "Configure platform settings" }
    ],
    primaryAction: {
      label: "Go to Admin Dashboard",
      path: "/kid-dashboard"
    }
  }
};
