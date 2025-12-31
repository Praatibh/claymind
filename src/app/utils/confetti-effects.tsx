"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// ==================== CONFETTI PARTICLE ====================

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationSpeed: number;
  shape: "circle" | "square" | "triangle" | "star";
  gravity: number;
}

const CONFETTI_COLORS = [
  "#2D9CDB", // Electric Blue
  "#FF6B6B", // Coral
  "#4ECDC4", // Mint
  "#A78BFA", // Purple
  "#F9D56E", // Yellow
  "#FF8585", // Light Coral
  "#6FD9D1", // Light Mint
];

/**
 * Create a confetti particle
 */
const createConfettiParticle = (x: number, y: number, index: number): ConfettiParticle => {
  const angle = (Math.PI * 2 * index) / 50 + (Math.random() - 0.5) * 0.5;
  const velocity = 3 + Math.random() * 5;

  return {
    id: Date.now() + index,
    x,
    y,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 8 + Math.random() * 8,
    velocityX: Math.cos(angle) * velocity,
    velocityY: Math.sin(angle) * velocity - 5, // Initial upward velocity
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 20,
    shape: ["circle", "square", "triangle", "star"][Math.floor(Math.random() * 4)] as any,
    gravity: 0.3 + Math.random() * 0.2,
  };
};

// ==================== CONFETTI CANVAS ====================

interface ConfettiCanvasProps {
  particles: ConfettiParticle[];
  onComplete?: () => void;
}

export function ConfettiCanvas({ particles: initialParticles, onComplete }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<ConfettiParticle[]>(initialParticles);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 16.67; // Normalize to 60fps
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update physics
        particle.velocityY += particle.gravity * deltaTime;
        particle.x += particle.velocityX * deltaTime;
        particle.y += particle.velocityY * deltaTime;
        particle.rotation += particle.rotationSpeed * deltaTime;

        // Remove particles that are off-screen
        if (particle.y > canvas.height + 50) return false;

        // Draw particle
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);

        ctx.fillStyle = particle.color;

        switch (particle.shape) {
          case "circle":
            ctx.beginPath();
            ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "square":
            ctx.fillRect(
              -particle.size / 2,
              -particle.size / 2,
              particle.size,
              particle.size
            );
            break;

          case "triangle":
            ctx.beginPath();
            ctx.moveTo(0, -particle.size / 2);
            ctx.lineTo(particle.size / 2, particle.size / 2);
            ctx.lineTo(-particle.size / 2, particle.size / 2);
            ctx.closePath();
            ctx.fill();
            break;

          case "star":
            drawStar(ctx, 0, 0, 5, particle.size / 2, particle.size / 4);
            ctx.fill();
            break;
        }

        ctx.restore();
        return true;
      });

      // Continue animation if particles remain
      if (particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "normal" }}
    />
  );
}

/**
 * Draw a star shape
 */
function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }

  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
}

// ==================== CONFETTI MANAGER ====================

interface ConfettiOptions {
  particleCount?: number;
  origin?: { x: number; y: number };
  spread?: number;
  colors?: string[];
}

export function useConfetti() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  const trigger = (options: ConfettiOptions = {}) => {
    const {
      particleCount = 100,
      origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      spread = 360,
    } = options;

    const newParticles: ConfettiParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push(createConfettiParticle(origin.x, origin.y, i));
    }

    setParticles(newParticles);
  };

  const clear = () => {
    setParticles([]);
  };

  return { trigger, clear, particles };
}

// ==================== CELEBRATION EFFECTS ====================

interface CelebrationProps {
  type: "levelUp" | "badgeEarned" | "missionComplete" | "achievement";
  onComplete?: () => void;
}

export function CelebrationEffect({ type, onComplete }: CelebrationProps) {
  const { trigger, particles, clear } = useConfetti();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Trigger confetti based on celebration type
    switch (type) {
      case "levelUp":
        // Massive burst from center
        trigger({ particleCount: 150, origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 } });
        setTimeout(() => trigger({ particleCount: 100, origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 } }), 200);
        break;

      case "badgeEarned":
        // Medium burst from center
        trigger({ particleCount: 80, origin: { x: window.innerWidth / 2, y: window.innerHeight / 3 } });
        break;

      case "missionComplete":
        // Dual burst from sides
        trigger({ particleCount: 60, origin: { x: 100, y: window.innerHeight / 2 } });
        setTimeout(() => trigger({ particleCount: 60, origin: { x: window.innerWidth - 100, y: window.innerHeight / 2 } }), 150);
        break;

      case "achievement":
        // Continuous bursts
        trigger({ particleCount: 50, origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 } });
        setTimeout(() => trigger({ particleCount: 50, origin: { x: window.innerWidth / 4, y: window.innerHeight / 3 } }), 100);
        setTimeout(() => trigger({ particleCount: 50, origin: { x: (3 * window.innerWidth) / 4, y: window.innerHeight / 3 } }), 200);
        break;
    }

    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [type, trigger, onComplete]);

  if (!show || particles.length === 0) return null;

  return <ConfettiCanvas particles={particles} onComplete={clear} />;
}

// ==================== FIREWORK EFFECT ====================

interface Firework {
  id: number;
  x: number;
  y: number;
  particles: FireworkParticle[];
  exploded: boolean;
  launchVelocity: number;
  currentY: number;
}

interface FireworkParticle {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  color: string;
  life: number;
  maxLife: number;
}

export function FireworksEffect({ duration = 3000, onComplete }: { duration?: number; onComplete?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworkId = 0;

    // Launch fireworks periodically
    const launchInterval = setInterval(() => {
      if (Date.now() - startTimeRef.current > duration) {
        clearInterval(launchInterval);
        return;
      }

      const x = Math.random() * canvas.width;
      const targetY = 100 + Math.random() * 200;

      fireworksRef.current.push({
        id: fireworkId++,
        x,
        y: canvas.height,
        currentY: canvas.height,
        particles: [],
        exploded: false,
        launchVelocity: 8 + Math.random() * 4,
      });
    }, 400);

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireworksRef.current = fireworksRef.current.filter((firework) => {
        if (!firework.exploded) {
          // Launch phase
          firework.currentY -= firework.launchVelocity;

          // Draw rocket
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(firework.x - 2, firework.currentY, 4, 10);

          // Explode when reaching target height
          if (firework.currentY <= 100 + Math.random() * 200) {
            firework.exploded = true;

            // Create explosion particles
            const particleCount = 50 + Math.random() * 50;
            const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];

            for (let i = 0; i < particleCount; i++) {
              const angle = (Math.PI * 2 * i) / particleCount;
              const velocity = 2 + Math.random() * 4;

              firework.particles.push({
                x: firework.x,
                y: firework.currentY,
                velocityX: Math.cos(angle) * velocity,
                velocityY: Math.sin(angle) * velocity,
                color,
                life: 1,
                maxLife: 60 + Math.random() * 40,
              });
            }
          }

          return true;
        } else {
          // Explosion phase
          firework.particles = firework.particles.filter((particle) => {
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.velocityY += 0.1; // Gravity
            particle.life--;

            if (particle.life > 0) {
              ctx.fillStyle = particle.color;
              ctx.globalAlpha = particle.life / particle.maxLife;
              ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
              ctx.globalAlpha = 1;
              return true;
            }

            return false;
          });

          return firework.particles.length > 0;
        }
      });

      // Continue animation if there are fireworks or within duration
      if (fireworksRef.current.length > 0 || Date.now() - startTimeRef.current < duration) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(launchInterval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}

// ==================== SPARKLE TRAIL ====================

interface SparkleTrailProps {
  x: number;
  y: number;
  color?: string;
}

export function SparkleTrail({ x, y, color = "#F9D56E" }: SparkleTrailProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path
          d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
          fill={color}
          opacity="0.8"
        />
      </svg>
    </motion.div>
  );
}

// ==================== FLOATING TEXT ====================

interface FloatingTextProps {
  text: string;
  x: number;
  y: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export function FloatingText({ text, x, y, color = "#2D9CDB", size = "md", icon }: FloatingTextProps) {
  const sizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <motion.div
      className={`absolute pointer-events-none font-bold ${sizes[size]} flex items-center gap-1.5`}
      style={{ left: x, top: y, color }}
      initial={{ y: 0, opacity: 1, scale: 1 }}
      animate={{
        y: -50,
        opacity: 0,
        scale: 1.2,
      }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {icon && <span>{icon}</span>}
      <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">{text}</span>
    </motion.div>
  );
}

// ==================== SIMPLE CONFETTI TRIGGER ====================

/**
 * Simple function to trigger confetti without hooks
 * Creates a temporary element to render confetti
 */
export function triggerConfetti(options: ConfettiOptions = {}) {
  if (typeof window === 'undefined') return;

  const {
    particleCount = 100,
    origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  } = options;

  // Create container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    document.body.removeChild(container);
    return;
  }

  // Create particles
  const particles: ConfettiParticle[] = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(createConfettiParticle(origin.x, origin.y, i));
  }

  // Animate
  let animationFrame: number;
  let lastTime = Date.now();

  const animate = () => {
    const now = Date.now();
    const deltaTime = (now - lastTime) / 16.67;
    lastTime = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const remainingParticles = particles.filter((particle) => {
      // Update physics
      particle.velocityY += particle.gravity * deltaTime;
      particle.x += particle.velocityX * deltaTime;
      particle.y += particle.velocityY * deltaTime;
      particle.rotation += particle.rotationSpeed * deltaTime;

      // Remove if off-screen
      if (particle.y > canvas.height + 50) return false;

      // Draw
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.fillStyle = particle.color;

      switch (particle.shape) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -particle.size / 2);
          ctx.lineTo(particle.size / 2, particle.size / 2);
          ctx.lineTo(-particle.size / 2, particle.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case 'star':
          drawStar(ctx, 0, 0, 5, particle.size / 2, particle.size / 4);
          ctx.fill();
          break;
      }

      ctx.restore();
      return true;
    });

    if (remainingParticles.length > 0) {
      particles.length = 0;
      particles.push(...remainingParticles);
      animationFrame = requestAnimationFrame(animate);
    } else {
      // Cleanup
      cancelAnimationFrame(animationFrame);
      document.body.removeChild(container);
    }
  };

  animationFrame = requestAnimationFrame(animate);
}
