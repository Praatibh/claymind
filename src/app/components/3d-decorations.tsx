"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Cube3D, Sphere3D, Pyramid3D } from "./3d-objects";

// ============================================================================
// FLOATING CUBE DECORATION
// ============================================================================

interface FloatingCubeProps {
  size?: number;
  color?: string;
  position?: { x: number; y: number };
  speed?: number;
  delay?: number;
}

export function FloatingCube({
  size = 60,
  color = "#2D9CDB",
  position = { x: 0, y: 0 },
  speed = 5,
  delay = 0,
}: FloatingCubeProps) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        pointerEvents: "none",
      }}
      animate={{
        y: [0, -20, 0],
        rotateX: [0, 360],
        rotateY: [0, 360],
      }}
      transition={{
        y: {
          duration: speed,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        rotateX: {
          duration: speed * 2,
          repeat: Infinity,
          ease: "linear",
          delay,
        },
        rotateY: {
          duration: speed * 3,
          repeat: Infinity,
          ease: "linear",
          delay,
        },
      }}
    >
      <Cube3D size={size} color={color} mouseTracking={false} autoRotate={false} />
    </motion.div>
  );
}

// ============================================================================
// ORBITING SPHERES
// ============================================================================

interface OrbitingSpheresProps {
  count?: number;
  radius?: number;
  sphereSize?: number;
  color?: string;
  speed?: number;
}

export function OrbitingSpheres({
  count = 3,
  radius = 100,
  sphereSize = 30,
  color = "#27AE60",
  speed = 10,
}: OrbitingSpheresProps) {
  const spheres = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: (i / count) * speed,
    angle: (i / count) * 360,
  }));

  return (
    <div
      style={{
        position: "relative",
        width: radius * 2,
        height: radius * 2,
        pointerEvents: "none",
      }}
    >
      {spheres.map((sphere) => (
        <motion.div
          key={sphere.id}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -sphereSize / 2,
            marginTop: -sphereSize / 2,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            delay: sphere.delay,
          }}
        >
          <div
            style={{
              transform: `translateX(${radius}px)`,
            }}
          >
            <Sphere3D size={sphereSize} color={color} mouseTracking={false} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// GEOMETRIC BACKGROUND
// ============================================================================

interface GeometricBackgroundProps {
  objectCount?: number;
  types?: Array<"cube" | "sphere" | "pyramid">;
  colors?: string[];
}

export function GeometricBackground({
  objectCount = 8,
  types = ["cube", "sphere", "pyramid"],
  colors = ["#2D9CDB", "#27AE60", "#9B51E0", "#F2C94C", "#E74C3C"],
}: GeometricBackgroundProps) {
  const [objects, setObjects] = useState<
    Array<{
      id: number;
      type: "cube" | "sphere" | "pyramid";
      x: number;
      y: number;
      size: number;
      color: string;
      speed: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const newObjects = Array.from({ length: objectCount }, (_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 30 + Math.random() * 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 4 + Math.random() * 6,
      delay: Math.random() * 2,
    }));
    setObjects(newObjects);
  }, [objectCount, types, colors]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.15,
      }}
    >
      {objects.map((obj) => {
        const Component =
          obj.type === "cube" ? Cube3D : obj.type === "sphere" ? Sphere3D : Pyramid3D;

        return (
          <motion.div
            key={obj.id}
            style={{
              position: "absolute",
              left: `${obj.x}%`,
              top: `${obj.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotateX: [0, 360],
              rotateY: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              y: {
                duration: obj.speed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: obj.delay,
              },
              rotateX: {
                duration: obj.speed * 2,
                repeat: Infinity,
                ease: "linear",
                delay: obj.delay,
              },
              rotateY: {
                duration: obj.speed * 3,
                repeat: Infinity,
                ease: "linear",
                delay: obj.delay,
              },
              scale: {
                duration: obj.speed * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: obj.delay,
              },
            }}
          >
            <Component size={obj.size} color={obj.color} mouseTracking={false} />
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================================
// PARALLAX LAYER
// ============================================================================

interface ParallaxLayerProps {
  depth?: number;
  children: React.ReactNode;
}

export function ParallaxLayer({ depth = 1, children }: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!layerRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xOffset = ((clientX - innerWidth / 2) / innerWidth) * (depth * 30);
      const yOffset = ((clientY - innerHeight / 2) / innerHeight) * (depth * 30);

      layerRef.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [depth]);

  return (
    <div
      ref={layerRef}
      style={{
        transition: "transform 0.3s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// SCENE 3D - Complete 3D Background Scene
// ============================================================================

interface Scene3DProps {
  children?: React.ReactNode;
  showBackground?: boolean;
  floatingObjects?: number;
  showOrbiting?: boolean;
}

export function Scene3D({
  children,
  showBackground = true,
  floatingObjects = 5,
  showOrbiting = false,
}: Scene3DProps) {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Geometric Background */}
      {showBackground && <GeometricBackground objectCount={floatingObjects} />}

      {/* Parallax Layers */}
      <ParallaxLayer depth={0.5}>
        <div style={{ position: "fixed", top: "10%", left: "5%", opacity: 0.2 }}>
          <FloatingCube size={80} color="#2D9CDB" speed={6} />
        </div>
      </ParallaxLayer>

      <ParallaxLayer depth={1}>
        <div style={{ position: "fixed", top: "20%", right: "10%", opacity: 0.25 }}>
          <FloatingCube size={60} color="#9B51E0" speed={5} delay={1} />
        </div>
      </ParallaxLayer>

      <ParallaxLayer depth={1.5}>
        <div style={{ position: "fixed", bottom: "15%", left: "15%", opacity: 0.2 }}>
          <Pyramid3D size={70} color="#F2C94C" mouseTracking={false} autoRotate />
        </div>
      </ParallaxLayer>

      {/* Orbiting Spheres */}
      {showOrbiting && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        >
          <OrbitingSpheres count={4} radius={150} sphereSize={25} speed={12} />
        </div>
      )}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
