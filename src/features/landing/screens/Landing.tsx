/**
 * Landing Screen
 * Clean, simple landing page using design tokens
 */

import { motion } from "motion/react";
import { Sparkles, Brain, Image, Video, Shield, Star, Play, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui";
import { Card } from "../../../components/ui";

interface LandingProps {
  onGetStarted: () => void;
  onParentView: () => void;
}

export function Landing({ onGetStarted, onParentView }: LandingProps) {
  const modules = [
    { icon: <Brain className="w-8 h-8" />, title: "AI Basics", bg: "bg-[var(--color-emerald-500)]" },
    { icon: <Sparkles className="w-8 h-8" />, title: "Build Apps", bg: "bg-[var(--color-amber-500)]" },
    { icon: <Image className="w-8 h-8" />, title: "Create Images", bg: "bg-[var(--color-slate-600)]" },
    { icon: <Video className="w-8 h-8" />, title: "Make Videos", bg: "bg-[var(--color-emerald-600)]" },
  ];

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Learn by Doing",
      desc: "Create real AI projects while learning"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Fun",
      desc: "Kid-friendly content with parental controls"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Earn Badges",
      desc: "Unlock achievements as you progress"
    },
  ];

  const testimonials = [
    { name: "Alex, 12", text: "I built my first AI app in just 2 days! So cool!" },
    { name: "Maya, 10", text: "ClayMind makes learning AI feel like playing a game!" },
    { name: "Jordan, 14", text: "Now I understand how AI works. Amazing!" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-zinc-50)]">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-flex items-center gap-2 bg-[var(--color-emerald-100)] px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-[var(--color-emerald-600)]" />
                <span className="text-[var(--color-emerald-700)] text-sm font-medium">AI Literacy for Kids 8-16</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-[var(--color-slate-900)] leading-tight">
                Learn AI by building
                <span className="block text-[var(--color-emerald-600)]">
                  apps, images, and videos
                </span>
              </h1>

              <p className="text-lg text-[var(--color-slate-600)] leading-relaxed">
                Welcome to ClayMind! A playground where kids discover artificial intelligence through creative projects and hands-on learning.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onGetStarted}
                  icon={<Play className="w-5 h-5" />}
                >
                  Start Learning Free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onParentView}
                >
                  For Parents
                </Button>
              </div>
            </motion.div>

            {/* Right: Module Preview Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {modules.map((module, i) => (
                <Card key={i} variant="default" padding="lg" className="text-center">
                  <div className={`w-14 h-14 rounded-xl ${module.bg} flex items-center justify-center mx-auto mb-3 text-white`}>
                    {module.icon}
                  </div>
                  <h3 className="font-semibold text-[var(--color-slate-900)]">{module.title}</h3>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-slate-900)] mb-3">
              How ClayMind Works
            </h2>
            <p className="text-lg text-[var(--color-slate-600)]">
              Three simple steps to start your AI journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Choose a Module", desc: "Pick from AI basics, app building, or creative tools" },
              { step: "2", title: "Learn & Create", desc: "Follow fun lessons and build real AI projects" },
              { step: "3", title: "Earn Badges", desc: "Show off your achievements and level up!" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="outlined" padding="lg" className="text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-emerald-500)] text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-slate-900)] mb-2">{item.title}</h3>
                  <p className="text-[var(--color-slate-600)]">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="filled" padding="lg" className="text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-emerald-500)] text-white flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-slate-900)] mb-2">{feature.title}</h3>
                  <p className="text-[var(--color-slate-600)]">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-slate-900)] mb-3">
              What Kids Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="default" padding="lg">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[var(--color-amber-400)] fill-[var(--color-amber-400)]" />
                    ))}
                  </div>
                  <p className="text-[var(--color-slate-700)] mb-3">"{testimonial.text}"</p>
                  <p className="text-[var(--color-emerald-600)] font-semibold">— {testimonial.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Card variant="default" padding="lg" className="text-center bg-[var(--color-emerald-500)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Start Your AI Journey?
              </h2>
              <p className="text-lg text-white/90 mb-6">
                Join thousands of kids learning AI the fun way!
              </p>
              <Button
                variant="secondary"
                size="lg"
                onClick={onGetStarted}
                iconRight={<ChevronRight className="w-5 h-5" />}
              >
                Get Started for Free
              </Button>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
}
