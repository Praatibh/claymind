/**
 * Landing Screen
 * Clean, simple landing page using design tokens
 */

import { motion } from "motion/react";
import { Sparkles, Brain, Image, Video, Shield, Star, Play, ChevronRight, Rocket, Zap } from "lucide-react";
import { Button3D } from "../../../app/components/3d-button";
import { Card } from "../../../components/ui";

interface LandingProps {
  onGetStarted: () => void;
  onParentView: () => void;
}

export function Landing({ onGetStarted, onParentView }: LandingProps) {
  const modules = [
    { icon: <Brain className="w-8 h-8" />, title: "AI Basics", bg: "bg-[var(--color-purple-500)]" },
    { icon: <Sparkles className="w-8 h-8" />, title: "Build Apps", bg: "bg-[var(--color-amber-500)]" },
    { icon: <Image className="w-8 h-8" />, title: "Create Images", bg: "bg-[var(--color-slate-600)]" },
    { icon: <Video className="w-8 h-8" />, title: "Make Videos", bg: "bg-[var(--color-purple-600)]" },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Learn by Building! 🛠️",
      desc: "Make real AI stuff that actually works - no boring lectures!"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Super Safe & Fun! 🎊",
      desc: "Parents love us! Safe, fun content made just for kids"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Collect Cool Badges! 🌟",
      desc: "Unlock awesome achievements and level up like a boss!"
    },
  ];

  const testimonials = [
    { name: "Alex, 12 🎮", text: "OMG! I made my first AI app in 2 days! My friends think I'm a genius! 🤯" },
    { name: "Maya, 10 🌟", text: "This is like the COOLEST game ever, but I'm actually learning stuff! 🎨" },
    { name: "Jordan, 14 🚀", text: "I finally get how AI works! Now I'm building my own chatbot! So awesome! 💪" },
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
              <motion.div
                className="inline-flex items-center gap-2 bg-[var(--color-purple-100)] px-4 py-2 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4 text-[var(--color-purple-600)]" />
                <span className="text-[var(--color-purple-700)] text-sm font-medium">✨ For Cool Kids Ages 8-16!</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold text-[var(--color-slate-900)] leading-tight">
                Become an AI Wizard! 🧙‍♂️
                <motion.span
                  className="block text-[var(--color-purple-600)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Build Awesome Apps, Images & Videos!
                </motion.span>
              </h1>

              <p className="text-lg text-[var(--color-slate-600)] leading-relaxed">
                🎨 Welcome to ClayMind! Your super-fun playground where you'll learn to create amazing AI projects just like magic! No boring stuff, just hands-on fun! 🚀
              </p>

              <div className="flex flex-wrap gap-4">
                <Button3D
                  variant="accent"
                  size="lg"
                  onClick={onGetStarted}
                  icon={<Rocket className="w-5 h-5" />}
                  glow={true}
                  shine={true}
                  pulse={true}
                >
                  Start Your Adventure FREE! 🎉
                </Button3D>
                <Button3D
                  variant="outline"
                  size="lg"
                  onClick={onParentView}
                  icon={<Shield className="w-5 h-5" />}
                >
                  Parents: Learn More
                </Button3D>
              </div>
            </motion.div>

            {/* Right: Module Preview Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {modules.map((module, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card variant="default" padding="lg" className="text-center cursor-pointer">
                    <motion.div
                      className={`w-14 h-14 rounded-xl ${module.bg} flex items-center justify-center mx-auto mb-3 text-white`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {module.icon}
                    </motion.div>
                    <h3 className="font-semibold text-[var(--color-slate-900)]">{module.title}</h3>
                  </Card>
                </motion.div>
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
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl lg:text-4xl font-bold text-[var(--color-slate-900)] mb-3"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              How It Works (Super Easy!) 🎯
            </motion.h2>
            <p className="text-lg text-[var(--color-slate-600)]">
              Just 3 easy-peasy steps to become an AI superstar! ⭐
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Pick Your Adventure 🎮", desc: "Choose from AI basics, app building, or make cool images & videos!" },
              { step: "2", title: "Create & Learn 🚀", desc: "Follow super fun lessons and build real AI projects that actually work!" },
              { step: "3", title: "Collect Badges 🏆", desc: "Earn awesome badges, level up, and show off to your friends!" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 12
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <Card variant="outlined" padding="lg" className="text-center h-full relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[var(--color-purple-50)] to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-[var(--color-purple-500)] text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    >
                      {item.step}
                    </motion.div>
                    <h3 className="text-xl font-bold text-[var(--color-slate-900)] mb-2">{item.title}</h3>
                    <p className="text-[var(--color-slate-600)]">{item.desc}</p>
                  </div>
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
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 150,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card variant="filled" padding="lg" className="text-center h-full relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[var(--color-purple-100)] to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-[var(--color-purple-500)] text-white flex items-center justify-center mx-auto mb-4"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-[var(--color-slate-900)] mb-2">{feature.title}</h3>
                    <p className="text-[var(--color-slate-600)]">{feature.desc}</p>
                  </div>
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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-slate-900)] mb-3">
              What Other Kids Are Saying! 💬
            </h2>
            <p className="text-lg text-[var(--color-slate-600)]">
              Real reviews from real kid creators! 😎
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, rotate: i % 2 === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: i * 0.2,
                  type: "spring",
                  stiffness: 120,
                  damping: 12
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card variant="default" padding="lg" className="h-full">
                  <motion.div
                    className="flex gap-1 mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.2 + 0.3 }}
                  >
                    {[...Array(5)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.2 + 0.3 + j * 0.05 }}
                      >
                        <Star className="w-4 h-4 text-[var(--color-amber-400)] fill-[var(--color-amber-400)]" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <p className="text-[var(--color-slate-700)] mb-3 text-base">"{testimonial.text}"</p>
                  <p className="text-[var(--color-purple-600)] font-semibold">— {testimonial.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <Card variant="default" padding="lg" className="text-center bg-gradient-to-br from-[var(--color-purple-500)] via-[var(--color-purple-600)] to-[var(--color-purple-700)] relative overflow-hidden">
              {/* Animated background elements */}
              <motion.div
                className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                animate={{
                  x: [0, -80, 0],
                  y: [0, -60, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.h2
                  className="text-3xl lg:text-5xl font-bold text-white mb-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Ready to Become an AI Superstar? 🌟
                </motion.h2>
                <p className="text-lg lg:text-xl text-white/95 mb-8 max-w-2xl mx-auto">
                  Join thousands of awesome kids who are already building AI magic! Start your FREE adventure TODAY! 🎉
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button3D
                    variant="fun"
                    size="xl"
                    onClick={onGetStarted}
                    icon={<Rocket className="w-6 h-6" />}
                    glow={true}
                    shine={true}
                    pulse={true}
                  >
                    Let's GO! Start FREE Now! 🚀
                  </Button3D>
                </div>
                <motion.p
                  className="text-white/80 text-sm mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  💯 100% FREE • No Credit Card • Start in 30 seconds!
                </motion.p>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
