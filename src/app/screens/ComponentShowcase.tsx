"use client";

import { useState } from "react";
import { Button3D } from "../components/3d-button";
import { Card3D } from "../components/3d-card";
import { ProgressBar3D } from "../components/3d-progress-bar";
import { Badge3D, BadgeGrid3D } from "../components/3d-badge";
import { CelebrationEffect, FireworksEffect, FloatingText } from "../utils/confetti-effects";
import { useAudioPreferences } from "../utils/haptics-sound";
import { Cube3D, Pyramid3D, Sphere3D, Star3D } from "../components/3d-objects";
import { FloatingCube, OrbitingSpheres, GeometricBackground, Scene3D } from "../components/3d-decorations";
import {
  Rocket,
  Star,
  Zap,
  Trophy,
  Crown,
  Sparkles,
  CheckCircle,
  Heart,
  Lock,
  Volume2,
  VolumeX,
  Settings,
  Box,
} from "lucide-react";

export function ComponentShowcase() {
  const [xpProgress, setXpProgress] = useState(45);
  const [celebrating, setCelebrating] = useState<"levelUp" | "badge" | "mission" | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<Array<{ id: number; x: number; y: number; text: string }>>([]);
  const [loading, setLoading] = useState(false);

  const {
    soundEnabled,
    hapticEnabled,
    volume,
    setSoundEnabled,
    setHapticEnabled,
    setVolume,
  } = useAudioPreferences();

  const sampleBadges = [
    {
      id: "1",
      icon: Star,
      title: "First Steps",
      description: "Complete your first mission",
      rarity: "common" as const,
      earned: true,
    },
    {
      id: "2",
      icon: Zap,
      title: "Speed Demon",
      description: "Finish 5 missions in one day",
      rarity: "rare" as const,
      earned: true,
    },
    {
      id: "3",
      icon: Crown,
      title: "Knowledge King",
      description: "Reach level 10",
      rarity: "epic" as const,
      earned: true,
    },
    {
      id: "4",
      icon: Trophy,
      title: "Perfect Score",
      description: "Get 100% on 10 missions",
      rarity: "legendary" as const,
      earned: false,
      progress: 60,
    },
  ];

  const addXP = () => {
    const newProgress = Math.min(xpProgress + 15, 100);
    setXpProgress(newProgress);

    if (newProgress === 100) {
      setCelebrating("levelUp");
    }
  };

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const showFloatingXP = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + rect.left;
    const y = e.clientY - rect.top + rect.top;

    const id = Date.now();
    setFloatingTexts((prev) => [...prev, { id, x, y, text: "+15 XP" }]);

    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((t) => t.id !== id));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      {/* Celebrations */}
      {celebrating && (
        <CelebrationEffect
          type={celebrating}
          onComplete={() => setCelebrating(null)}
        />
      )}
      {showFireworks && (
        <FireworksEffect
          duration={3000}
          onComplete={() => setShowFireworks(false)}
        />
      )}

      {/* Floating XP Text */}
      {floatingTexts.map((text) => (
        <FloatingText
          key={text.id}
          text={text.text}
          x={text.x}
          y={text.y}
          color="#2D9CDB"
          size="lg"
          icon={<Zap size={24} />}
        />
      ))}

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Enhanced 3D Component Showcase
          </h1>
          <p className="text-lg text-gray-600">
            Click, hover, and interact to feel the haptics and hear the sounds!
          </p>
        </div>

        {/* Audio Settings */}
        <Card3D variant="secondary" size="lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Settings size={28} />
              Audio & Haptic Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Sound Effects</span>
              <Button3D
                variant={soundEnabled ? "success" : "secondary"}
                size="sm"
                icon={soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? "Enabled" : "Disabled"}
              </Button3D>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold">Haptic Feedback</span>
              <Button3D
                variant={hapticEnabled ? "success" : "secondary"}
                size="sm"
                onClick={() => setHapticEnabled(!hapticEnabled)}
              >
                {hapticEnabled ? "Enabled" : "Disabled"}
              </Button3D>
            </div>

            <div className="space-y-2">
              <label className="font-semibold">Volume: {Math.round(volume * 100)}%</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </Card3D>

        {/* Button Showcase */}
        <Card3D variant="secondary" size="lg">
          <h2 className="text-2xl font-bold mb-6">Enhanced Buttons</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">All Variants with Ripple & Haptics</h3>
              <div className="flex flex-wrap gap-4">
                <Button3D variant="primary" icon={<Rocket size={20} />}>
                  Primary
                </Button3D>
                <Button3D variant="secondary" icon={<Heart size={20} />}>
                  Secondary
                </Button3D>
                <Button3D variant="accent" icon={<Crown size={20} />}>
                  Accent
                </Button3D>
                <Button3D variant="success" icon={<CheckCircle size={20} />}>
                  Success
                </Button3D>
                <Button3D variant="danger" icon={<Zap size={20} />}>
                  Danger
                </Button3D>
                <Button3D variant="fun" icon={<Star size={20} />}>
                  Fun
                </Button3D>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Loading States</h3>
              <div className="flex flex-wrap gap-4">
                <Button3D variant="primary" loading={loading} onClick={simulateLoading}>
                  {loading ? "Saving..." : "Click to Load"}
                </Button3D>
                <Button3D variant="success" loading>
                  Processing...
                </Button3D>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Pulse Animation (CTA)</h3>
              <div className="flex flex-wrap gap-4">
                <Button3D variant="primary" pulse icon={<Star size={20} />}>
                  Pulsing CTA
                </Button3D>
                <Button3D variant="fun" pulse size="lg" icon={<Trophy size={24} />}>
                  Claim Reward!
                </Button3D>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Disabled State</h3>
              <Button3D variant="primary" disabled>
                Disabled Button
              </Button3D>
            </div>
          </div>
        </Card3D>

        {/* Progress Bar Showcase */}
        <Card3D variant="secondary" size="lg">
          <h2 className="text-2xl font-bold mb-6">Interactive Progress Bar</h2>

          <div className="space-y-6">
            <ProgressBar3D
              current={xpProgress}
              max={100}
              label="XP Progress"
              variant="xp"
              size="lg"
              showRunner={true}
              showParticles={true}
            />

            <div className="flex gap-4">
              <Button3D
                variant="primary"
                onClick={(e) => {
                  addXP();
                  showFloatingXP(e);
                }}
              >
                Add 15 XP
              </Button3D>
              <Button3D variant="secondary" onClick={() => setXpProgress(0)}>
                Reset Progress
              </Button3D>
            </div>

            {xpProgress === 100 && (
              <div className="text-center p-4 bg-green-100 rounded-xl">
                <p className="text-lg font-bold text-green-800">🎉 Level Complete!</p>
              </div>
            )}
          </div>
        </Card3D>

        {/* Cards Showcase */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Enhanced Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card3D variant="primary" hover="tilt" badge={{ text: "New", color: "blue" }}>
              <Rocket size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Tilt Effect</h3>
              <p className="text-sm opacity-90">Move your mouse over me!</p>
            </Card3D>

            <Card3D variant="success" hover="lift" badge={{ icon: Star, text: "Featured", color: "green" }}>
              <Trophy size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Lift Effect</h3>
              <p className="text-sm opacity-90">I rise up on hover</p>
            </Card3D>

            <Card3D variant="purple" hover="glow" badge={{ icon: Crown, text: "Premium", color: "purple" }}>
              <Crown size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Glow Effect</h3>
              <p className="text-sm opacity-90">I glow when you hover</p>
            </Card3D>

            <Card3D variant="warning" hover="tilt">
              <Star size={32} className="mb-3 text-gray-800" />
              <h3 className="text-xl font-bold mb-2">Warning Card</h3>
              <p className="text-sm opacity-90">Sunshine yellow vibes</p>
            </Card3D>

            <Card3D variant="gradient" hover="lift" badge={{ icon: Sparkles, text: "Special", color: "purple" }}>
              <Sparkles size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Gradient</h3>
              <p className="text-sm opacity-90">Multi-color magic</p>
            </Card3D>

            <Card3D variant="secondary" hover="tilt" locked={true}>
              <Lock size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Locked</h3>
              <p className="text-sm opacity-90">Complete mission first</p>
            </Card3D>
          </div>
        </section>

        {/* Badges Showcase */}
        <Card3D variant="secondary" size="lg">
          <h2 className="text-2xl font-bold mb-6">Achievement Badges</h2>
          <BadgeGrid3D
            badges={sampleBadges}
            size="md"
            columns={4}
            onBadgeClick={(id) => {
              if (id === "4") {
                setCelebrating("badge");
              }
            }}
          />
        </Card3D>

        {/* Celebration Triggers */}
        <Card3D variant="secondary" size="lg">
          <h2 className="text-2xl font-bold mb-6">Celebration Effects</h2>
          <div className="flex flex-wrap gap-4">
            <Button3D
              variant="primary"
              icon={<Trophy size={20} />}
              onClick={() => setCelebrating("levelUp")}
            >
              Level Up Celebration
            </Button3D>
            <Button3D
              variant="accent"
              icon={<Crown size={20} />}
              onClick={() => setCelebrating("badge")}
            >
              Badge Earned
            </Button3D>
            <Button3D
              variant="success"
              icon={<CheckCircle size={20} />}
              onClick={() => setCelebrating("mission")}
            >
              Mission Complete
            </Button3D>
            <Button3D
              variant="fun"
              icon={<Sparkles size={20} />}
              onClick={() => setShowFireworks(true)}
            >
              Fireworks!
            </Button3D>
          </div>
        </Card3D>

        {/* 3D Objects Showcase */}
        <Card3D variant="secondary" size="lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Box size={28} />
            Interactive 3D Objects
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Individual 3D Objects</h3>
              <div className="flex flex-wrap items-center justify-around gap-8 p-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl">
                <div className="text-center">
                  <Cube3D size={80} color="#2D9CDB" mouseTracking={true} />
                  <p className="mt-2 text-sm font-medium">Cube3D</p>
                  <p className="text-xs text-gray-600">Mouse tracking</p>
                </div>
                <div className="text-center">
                  <Pyramid3D size={80} color="#9B51E0" mouseTracking={true} />
                  <p className="mt-2 text-sm font-medium">Pyramid3D</p>
                  <p className="text-xs text-gray-600">4-sided pyramid</p>
                </div>
                <div className="text-center">
                  <Sphere3D size={80} color="#27AE60" mouseTracking={true} />
                  <p className="mt-2 text-sm font-medium">Sphere3D</p>
                  <p className="text-xs text-gray-600">CSS gradient sphere</p>
                </div>
                <div className="text-center">
                  <Star3D size={80} color="#F2C94C" mouseTracking={true} autoRotate={true} />
                  <p className="mt-2 text-sm font-medium">Star3D</p>
                  <p className="text-xs text-gray-600">Auto-rotating</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Auto-Rotating Objects</h3>
              <div className="flex flex-wrap items-center justify-around gap-8 p-8 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-xl">
                <Cube3D size={60} color="#E74C3C" mouseTracking={false} autoRotate={true} />
                <Pyramid3D size={60} color="#3498DB" mouseTracking={false} autoRotate={true} />
                <Star3D size={60} color="#FF6B6B" mouseTracking={false} autoRotate={true} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Orbiting Spheres</h3>
              <div className="flex justify-center p-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <OrbitingSpheres count={4} radius={100} sphereSize={30} color="#8B5CF6" speed={8} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Floating Decorations</h3>
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl overflow-hidden">
                <FloatingCube size={50} color="#2D9CDB" position={{ x: 50, y: 50 }} speed={4} delay={0} />
                <FloatingCube size={40} color="#9B51E0" position={{ x: 200, y: 100 }} speed={5} delay={1} />
                <FloatingCube size={35} color="#27AE60" position={{ x: 350, y: 80 }} speed={6} delay={2} />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>💡 Pro Tip:</strong> Hover your mouse over the objects to see them respond! The 3D objects use pure CSS transforms with GPU acceleration for smooth 60fps performance.
              </p>
            </div>
          </div>
        </Card3D>

        {/* Technical Info */}
        <Card3D variant="secondary" size="lg">
          <h2 className="text-2xl font-bold mb-4">What's Enhanced?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold mb-2">✨ Haptic Feedback</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Light haptic on hover</li>
                <li>• Medium haptic on click</li>
                <li>• Success pattern for wins</li>
                <li>• Error pattern for warnings</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">🔊 Sound Effects</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Synthesized Web Audio API sounds</li>
                <li>• 12 unique sound effects</li>
                <li>• Variant-specific sounds</li>
                <li>• Volume control</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">💫 Micro-Interactions</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Ripple effect on click</li>
                <li>• Loading spinner states</li>
                <li>• Pulse animations for CTAs</li>
                <li>• Icon wiggle on hover</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">🎊 Celebrations</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• Physics-based confetti</li>
                <li>• Fireworks animations</li>
                <li>• Floating text effects</li>
                <li>• Sparkle trails</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">📦 3D Objects</h3>
              <ul className="space-y-1 text-gray-700">
                <li>• CSS 3D transforms</li>
                <li>• Mouse-responsive rotation</li>
                <li>• Auto-rotate animations</li>
                <li>• GPU-accelerated (60fps)</li>
              </ul>
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
}
