"use client";

import { useState } from "react";
import { Button3D } from "./3d-button";
import { Card3D } from "./3d-card";
import { ProgressBar3D } from "./3d-progress-bar";
import { Badge3D, BadgeGrid3D } from "./3d-badge";
import {
  Rocket,
  Star,
  Zap,
  Trophy,
  Target,
  Crown,
  Sparkles,
  CheckCircle,
  Play,
  Lock,
  Heart,
  Book,
  Award,
} from "lucide-react";

export default function UltraRealistic3DShowcase() {
  const [xpProgress, setXpProgress] = useState(65);
  const [missionProgress, setMissionProgress] = useState(40);

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
      earned: true,
    },
    {
      id: "5",
      icon: Sparkles,
      title: "AI Master",
      description: "Complete all AI missions",
      rarity: "mythic" as const,
      earned: false,
      progress: 75,
    },
    {
      id: "6",
      icon: Target,
      title: "Streak Master",
      description: "Maintain a 30-day streak",
      rarity: "epic" as const,
      earned: false,
      progress: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            Ultra-Realistic 3D Components
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the next generation of UI design with true 3D depth, realistic lighting,
            and physics-based interactions.
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">3D Buttons</h2>

          {/* All Variants */}
          <Card3D variant="secondary" size="lg">
            <h3 className="text-xl font-bold mb-4">All Button Variants</h3>
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
          </Card3D>

          {/* All Sizes */}
          <Card3D variant="secondary" size="lg">
            <h3 className="text-xl font-bold mb-4">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button3D variant="primary" size="sm">
                Small
              </Button3D>
              <Button3D variant="primary" size="md">
                Medium
              </Button3D>
              <Button3D variant="primary" size="lg">
                Large
              </Button3D>
              <Button3D variant="primary" size="xl">
                Extra Large
              </Button3D>
            </div>
          </Card3D>

          {/* Button Features */}
          <Card3D variant="secondary" size="lg">
            <h3 className="text-xl font-bold mb-4">Button Features</h3>
            <div className="flex flex-wrap gap-4">
              <Button3D variant="accent" glow={true} shine={true}>
                Glow + Shine
              </Button3D>
              <Button3D variant="accent" glow={false} shine={true}>
                Shine Only
              </Button3D>
              <Button3D variant="accent" glow={true} shine={false}>
                Glow Only
              </Button3D>
              <Button3D variant="primary" disabled>
                Disabled
              </Button3D>
            </div>
          </Card3D>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">3D Cards</h2>

          {/* Card Variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card3D variant="primary" hover="tilt" badge={{ text: "New", color: "blue" }}>
              <Rocket size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Primary Card</h3>
              <p className="text-sm opacity-90">Tilt effect on hover with depth shadows</p>
            </Card3D>

            <Card3D variant="success" hover="lift" badge={{ icon: Star, text: "Featured", color: "green" }}>
              <Trophy size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Success Card</h3>
              <p className="text-sm opacity-90">Lifts up on hover with enhanced shadow</p>
            </Card3D>

            <Card3D variant="purple" hover="glow" badge={{ icon: Crown, text: "Premium", color: "purple" }}>
              <Crown size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Purple Card</h3>
              <p className="text-sm opacity-90">Glow effect on hover with scale</p>
            </Card3D>

            <Card3D variant="warning" hover="tilt">
              <Star size={32} className="mb-3 text-gray-800" />
              <h3 className="text-xl font-bold mb-2">Warning Card</h3>
              <p className="text-sm opacity-90">Sunshine yellow with dark text</p>
            </Card3D>

            <Card3D variant="gradient" hover="lift" badge={{ icon: Sparkles, text: "Special", color: "purple" }}>
              <Sparkles size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Gradient Card</h3>
              <p className="text-sm opacity-90">Multi-color gradient background</p>
            </Card3D>

            <Card3D variant="secondary" hover="tilt" locked={true}>
              <Lock size={32} className="mb-3" />
              <h3 className="text-xl font-bold mb-2">Locked Card</h3>
              <p className="text-sm opacity-90">Complete previous mission to unlock</p>
            </Card3D>
          </div>

          {/* Interactive Mission Card */}
          <Card3D
            variant="primary"
            size="lg"
            hover="lift"
            badge={{ icon: Play, text: "Active", color: "blue" }}
            onClick={() => alert("Mission started!")}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Book size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Understanding AI Basics</h3>
                <p className="text-sm opacity-90 mb-4">
                  Learn the fundamentals of artificial intelligence and how machines learn from
                  data.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Target size={16} />5 lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap size={16} />
                    250 XP
                  </span>
                </div>
              </div>
            </div>
          </Card3D>
        </section>

        {/* Progress Bars Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">3D Progress Bars</h2>

          <Card3D variant="secondary" size="lg">
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
              <Button3D
                variant="primary"
                size="sm"
                onClick={() => setXpProgress(Math.min(xpProgress + 10, 100))}
              >
                Add 10 XP
              </Button3D>
            </div>
          </Card3D>

          <Card3D variant="secondary" size="lg">
            <div className="space-y-6">
              <ProgressBar3D
                current={missionProgress}
                max={100}
                label="Mission Progress"
                variant="mission"
                size="md"
                showParticles={true}
              />
              <ProgressBar3D
                current={85}
                max={100}
                label="Daily Challenge"
                variant="streak"
                size="md"
              />
              <ProgressBar3D
                current={42}
                max={100}
                label="Season Pass"
                variant="season"
                size="md"
              />
            </div>
          </Card3D>

          {/* Small Progress Bars */}
          <Card3D variant="secondary" size="lg">
            <h3 className="text-xl font-bold mb-4">Compact Progress Indicators</h3>
            <div className="space-y-3">
              <ProgressBar3D current={75} max={100} variant="xp" size="sm" />
              <ProgressBar3D current={60} max={100} variant="mission" size="sm" />
              <ProgressBar3D current={90} max={100} variant="streak" size="sm" />
            </div>
          </Card3D>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">3D Badges</h2>

          {/* Badge Rarities */}
          <Card3D variant="secondary" size="lg">
            <h3 className="text-xl font-bold mb-6">Badge Rarities</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <Badge3D icon={Star} title="Common" rarity="common" earned={true} size="md" />
              <Badge3D icon={Sparkles} title="Rare" rarity="rare" earned={true} size="md" />
              <Badge3D icon={Crown} title="Epic" rarity="epic" earned={true} size="md" />
              <Badge3D
                icon={Trophy}
                title="Legendary"
                rarity="legendary"
                earned={true}
                size="md"
                showPulse={true}
              />
              <Badge3D
                icon={Zap}
                title="Mythic"
                rarity="mythic"
                earned={true}
                size="md"
                showPulse={true}
              />
            </div>
          </Card3D>

          {/* Badge Sizes */}
          <Card3D variant="secondary" size="lg">
            <h3 className="text-xl font-bold mb-6">Badge Sizes</h3>
            <div className="flex flex-wrap justify-center items-end gap-8">
              <Badge3D icon={Star} title="Small" rarity="rare" earned={true} size="sm" />
              <Badge3D icon={Star} title="Medium" rarity="rare" earned={true} size="md" />
              <Badge3D icon={Star} title="Large" rarity="rare" earned={true} size="lg" />
            </div>
          </Card3D>

          {/* Badge States */}
          <Card3D variant="secondary" size="lg">
            <h3 className="text-xl font-bold mb-6">Badge States</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <Badge3D
                icon={Award}
                title="Earned"
                description="You got this!"
                rarity="epic"
                earned={true}
                size="md"
              />
              <Badge3D
                icon={Target}
                title="Locked"
                description="Not yet unlocked"
                rarity="epic"
                earned={false}
                size="md"
              />
              <Badge3D
                icon={Trophy}
                title="In Progress"
                description="75% complete"
                rarity="legendary"
                earned={false}
                progress={75}
                size="md"
              />
            </div>
          </Card3D>

          {/* Badge Collection Grid */}
          <Card3D variant="secondary" size="lg">
            <h3 className="text-xl font-bold mb-6">Badge Collection</h3>
            <BadgeGrid3D
              badges={sampleBadges}
              size="md"
              columns={3}
              onBadgeClick={(id) => alert(`Badge ${id} clicked!`)}
            />
          </Card3D>
        </section>

        {/* Real-World Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Real-World Example: Mission Complete</h2>

          <Card3D variant="gradient" size="lg" hover="glow">
            <div className="text-center space-y-6">
              <div className="inline-flex">
                <Badge3D
                  icon={Trophy}
                  title="Mission Complete!"
                  rarity="legendary"
                  earned={true}
                  size="lg"
                  showPulse={true}
                />
              </div>

              <div>
                <h2 className="text-3xl font-extrabold mb-2">Amazing Work!</h2>
                <p className="text-lg opacity-90">You've completed "Understanding AI Basics"</p>
              </div>

              <ProgressBar3D
                current={100}
                max={100}
                label="XP Earned"
                variant="xp"
                size="lg"
                showRunner={true}
                showParticles={true}
              />

              <div className="flex justify-center gap-4">
                <Button3D variant="fun" size="lg" icon={<Star size={24} />}>
                  Claim Reward
                </Button3D>
                <Button3D variant="secondary" size="lg">
                  Next Mission
                </Button3D>
              </div>
            </div>
          </Card3D>
        </section>

        {/* Technical Features */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Technical Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card3D variant="secondary">
              <h3 className="text-lg font-bold mb-3">🎨 Multi-Layer Lighting</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Glossy top highlights</li>
                <li>• Inner depth shadows</li>
                <li>• Bottom depth gradients</li>
                <li>• Border lighting (light top, dark bottom)</li>
              </ul>
            </Card3D>

            <Card3D variant="secondary">
              <h3 className="text-lg font-bold mb-3">🔮 Real 3D Depth</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Solid shadow (8px depth)</li>
                <li>• Soft ambient glow</li>
                <li>• Mouse-responsive tilt</li>
                <li>• Spring physics rotation</li>
              </ul>
            </Card3D>

            <Card3D variant="secondary">
              <h3 className="text-lg font-bold mb-3">✨ Dynamic Effects</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Animated shine sweeps</li>
                <li>• Particle emissions</li>
                <li>• Pulsing glows</li>
                <li>• Progress animations</li>
              </ul>
            </Card3D>

            <Card3D variant="secondary">
              <h3 className="text-lg font-bold mb-3">🎯 Physics-Based</h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Press compression (6px)</li>
                <li>• Hover lift (-3px)</li>
                <li>• Spring damping</li>
                <li>• GPU-accelerated</li>
              </ul>
            </Card3D>
          </div>
        </section>
      </div>
    </div>
  );
}
