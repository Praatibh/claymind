import { Button3D } from './3d-button';
import { Sparkles, Rocket, Heart, CheckCircle, AlertTriangle, Star } from 'lucide-react';

export function ButtonShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black text-gray-900">
            Ultra-Realistic 3D Buttons
          </h1>
          <p className="text-xl text-gray-600">
            With depth, lighting, physics, and satisfying interactions
          </p>
        </div>

        {/* Primary Buttons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Primary Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center gap-4">
              <Button3D variant="primary" size="sm">
                Small Button
              </Button3D>
              <Button3D variant="primary" size="md">
                Medium Button
              </Button3D>
              <Button3D variant="primary" size="lg">
                Large Button
              </Button3D>
              <Button3D variant="primary" size="xl">
                Extra Large
              </Button3D>
            </div>
          </div>
        </section>

        {/* All Variants */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">All Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Button3D variant="primary" icon={<Rocket size={20} />}>
              Start Mission
            </Button3D>

            <Button3D variant="secondary" icon={<Heart size={20} />}>
              Save Progress
            </Button3D>

            <Button3D variant="accent" icon={<Sparkles size={20} />}>
              Unlock Badge
            </Button3D>

            <Button3D variant="success" icon={<CheckCircle size={20} />}>
              Complete Lesson
            </Button3D>

            <Button3D variant="danger" icon={<AlertTriangle size={20} />}>
              Delete Account
            </Button3D>

            <Button3D variant="fun" icon={<Star size={20} />}>
              Claim Reward
            </Button3D>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Interactive Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Glow Effect */}
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">With Glow Effect</h3>
              <div className="space-y-4">
                <Button3D variant="primary" glow={true}>
                  Hover me for glow
                </Button3D>
                <Button3D variant="accent" glow={true}>
                  Glow enabled
                </Button3D>
              </div>
            </div>

            {/* No Glow */}
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Without Glow</h3>
              <div className="space-y-4">
                <Button3D variant="primary" glow={false}>
                  No glow effect
                </Button3D>
                <Button3D variant="accent" glow={false}>
                  Glow disabled
                </Button3D>
              </div>
            </div>

            {/* Shine Effect */}
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">With Shine Animation</h3>
              <div className="space-y-4">
                <Button3D variant="success" shine={true}>
                  Watch the shine
                </Button3D>
                <Button3D variant="fun" shine={true}>
                  Shiny button
                </Button3D>
              </div>
            </div>

            {/* Disabled State */}
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Disabled State</h3>
              <div className="space-y-4">
                <Button3D variant="primary" disabled>
                  Disabled Button
                </Button3D>
                <Button3D variant="success" disabled icon={<CheckCircle size={20} />}>
                  Can't click me
                </Button3D>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Usage */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Real-World Examples</h2>
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-12 space-y-8">
            {/* Mission Complete Screen */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 space-y-6 text-center">
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900">Mission Complete!</h3>
              <p className="text-gray-600">You earned 150 XP and unlocked the "Fact Checker" badge!</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button3D variant="primary" size="lg" icon={<Rocket size={24} />}>
                  Next Mission
                </Button3D>
                <Button3D variant="accent" size="lg">
                  View Badge
                </Button3D>
              </div>
            </div>

            {/* Daily Challenge */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">🌟 Daily Challenge</h3>
              <div className="space-y-2">
                <p className="text-gray-700">Complete 3 missions today</p>
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full w-2/3" />
                </div>
                <p className="text-sm text-gray-600">2/3 completed</p>
              </div>
              <Button3D variant="fun" size="md" icon={<Star size={20} />}>
                Claim Reward (50 XP)
              </Button3D>
            </div>

            {/* Action Panel */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button3D variant="primary" size="sm">
                  Continue
                </Button3D>
                <Button3D variant="success" size="sm">
                  Save
                </Button3D>
                <Button3D variant="secondary" size="sm">
                  Skip
                </Button3D>
                <Button3D variant="danger" size="sm">
                  Exit
                </Button3D>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Tilt Demo */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">3D Tilt Effect</h2>
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-12">
            <p className="text-center text-gray-600 mb-8">
              Move your mouse over the buttons to see the 3D tilt effect!
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              <Button3D variant="primary" size="xl" icon={<Rocket size={28} />}>
                Hover & Tilt Me
              </Button3D>
              <Button3D variant="fun" size="xl" icon={<Sparkles size={28} />}>
                Watch Me Move
              </Button3D>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Technical Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 space-y-3">
              <div className="text-3xl">✨</div>
              <h4 className="font-bold text-gray-900">Real Depth Shadow</h4>
              <p className="text-sm text-gray-600">8px solid shadow creates actual 3D depth with proper light physics</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 space-y-3">
              <div className="text-3xl">🎨</div>
              <h4 className="font-bold text-gray-900">Multi-Layer Lighting</h4>
              <p className="text-sm text-gray-600">Top highlight, inner shadow, and bottom depth for realistic material</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 space-y-3">
              <div className="text-3xl">🔄</div>
              <h4 className="font-bold text-gray-900">3D Tilt Transform</h4>
              <p className="text-sm text-gray-600">Mouse-responsive 3D rotation using Framer Motion transforms</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 space-y-3">
              <div className="text-3xl">💫</div>
              <h4 className="font-bold text-gray-900">Shine Animation</h4>
              <p className="text-sm text-gray-600">Continuous glossy shine effect sweeps across surface</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 space-y-3">
              <div className="text-3xl">🎯</div>
              <h4 className="font-bold text-gray-900">Physics-Based Press</h4>
              <p className="text-sm text-gray-600">Button compresses 6px down with shadow reduction on click</p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 space-y-3">
              <div className="text-3xl">🌈</div>
              <h4 className="font-bold text-gray-900">Gradient Depth</h4>
              <p className="text-sm text-gray-600">3-color gradient creates natural color variation and depth</p>
            </div>
          </div>
        </section>
      </div>

      {/* Add CSS for shine animation */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }

        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
