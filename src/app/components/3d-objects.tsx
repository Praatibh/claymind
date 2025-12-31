"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

// ============================================================================
// CUBE 3D COMPONENT
// ============================================================================

interface Cube3DProps {
  size?: number;
  color?: string;
  spin?: boolean;
  mouseTracking?: boolean;
  autoRotate?: boolean;
  className?: string;
}

export function Cube3D({
  size = 100,
  color = "#2D9CDB",
  spin = false,
  mouseTracking = true,
  autoRotate = false,
  className = "",
}: Cube3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    if (!mouseTracking || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Convert mouse position to rotation angles
      const newRotateY = (deltaX / rect.width) * 60; // ±30° horizontal
      const newRotateX = -(deltaY / rect.height) * 60; // ±30° vertical

      rotateY.set(newRotateY);
      rotateX.set(newRotateX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, mouseTracking, rotateX, rotateY]);

  const halfSize = size / 2;

  // Face styles
  const faceStyle = {
    position: "absolute" as const,
    width: size,
    height: size,
    background: color,
    border: "2px solid rgba(255, 255, 255, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.2,
    fontWeight: "bold" as const,
    color: "rgba(255, 255, 255, 0.8)",
    boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        perspective: "1000px",
        width: size,
        height: size,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (mouseTracking) {
          rotateX.set(0);
          rotateY.set(0);
        }
      }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
          rotateX: mouseTracking ? rotateX : undefined,
          rotateY: mouseTracking ? rotateY : undefined,
        }}
        animate={
          autoRotate
            ? {
                rotateY: [0, 360],
              }
            : undefined
        }
        transition={
          autoRotate
            ? {
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }
            : {
                type: "spring",
                stiffness: 100,
                damping: 20,
              }
        }
      >
        {/* Front Face */}
        <div
          style={{
            ...faceStyle,
            transform: `translateZ(${halfSize}px)`,
          }}
        >
          Front
        </div>

        {/* Back Face */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateY(180deg) translateZ(${halfSize}px)`,
          }}
        >
          Back
        </div>

        {/* Left Face */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
          }}
        >
          Left
        </div>

        {/* Right Face */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateY(90deg) translateZ(${halfSize}px)`,
          }}
        >
          Right
        </div>

        {/* Top Face */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateX(90deg) translateZ(${halfSize}px)`,
          }}
        >
          Top
        </div>

        {/* Bottom Face */}
        <div
          style={{
            ...faceStyle,
            transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
          }}
        >
          Bottom
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// PYRAMID 3D COMPONENT
// ============================================================================

interface Pyramid3DProps {
  size?: number;
  color?: string;
  mouseTracking?: boolean;
  autoRotate?: boolean;
  className?: string;
}

export function Pyramid3D({
  size = 100,
  color = "#9B51E0",
  mouseTracking = true,
  autoRotate = false,
  className = "",
}: Pyramid3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(20);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    if (!mouseTracking || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const newRotateY = (deltaX / rect.width) * 60;
      const newRotateX = 20 - (deltaY / rect.height) * 40; // Keep slight tilt

      rotateY.set(newRotateY);
      rotateX.set(newRotateX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, mouseTracking, rotateX, rotateY]);

  const faceStyle = {
    position: "absolute" as const,
    width: 0,
    height: 0,
    borderStyle: "solid" as const,
  };

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        perspective: "1000px",
        width: size,
        height: size,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (mouseTracking) {
          rotateX.set(20);
          rotateY.set(0);
        }
      }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
          rotateX: mouseTracking ? rotateX : 20,
          rotateY: mouseTracking ? rotateY : undefined,
        }}
        animate={
          autoRotate
            ? {
                rotateY: [0, 360],
              }
            : undefined
        }
        transition={
          autoRotate
            ? {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }
            : {
                type: "spring",
                stiffness: 100,
                damping: 20,
              }
        }
      >
        {/* Base */}
        <div
          style={{
            position: "absolute",
            width: size,
            height: size,
            background: color,
            transform: `rotateX(90deg) translateZ(-${size / 2}px)`,
            opacity: 0.8,
            border: "2px solid rgba(255, 255, 255, 0.3)",
          }}
        />

        {/* Front Triangle */}
        <div
          style={{
            ...faceStyle,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
            transform: `translateY(${size / 2}px) translateZ(${size / 2}px) rotateX(-60deg)`,
            opacity: 0.9,
            filter: "brightness(1.1)",
          }}
        />

        {/* Back Triangle */}
        <div
          style={{
            ...faceStyle,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
            transform: `translateY(${size / 2}px) translateZ(-${size / 2}px) rotateX(-60deg) rotateY(180deg)`,
            opacity: 0.8,
            filter: "brightness(0.9)",
          }}
        />

        {/* Left Triangle */}
        <div
          style={{
            ...faceStyle,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
            transform: `translateY(${size / 2}px) translateZ(0px) rotateY(-90deg) rotateX(-60deg)`,
            opacity: 0.85,
            filter: "brightness(0.95)",
          }}
        />

        {/* Right Triangle */}
        <div
          style={{
            ...faceStyle,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
            transform: `translateY(${size / 2}px) translateZ(0px) rotateY(90deg) rotateX(-60deg)`,
            opacity: 0.85,
            filter: "brightness(1.05)",
          }}
        />
      </motion.div>
    </div>
  );
}

// ============================================================================
// SPHERE 3D COMPONENT
// ============================================================================

interface Sphere3DProps {
  size?: number;
  color?: string;
  mouseTracking?: boolean;
  className?: string;
}

export function Sphere3D({
  size = 100,
  color = "#27AE60",
  mouseTracking = true,
  className = "",
}: Sphere3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    if (!mouseTracking || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const newRotateY = (deltaX / rect.width) * 40;
      const newRotateX = -(deltaY / rect.height) * 40;

      rotateY.set(newRotateY);
      rotateX.set(newRotateX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, mouseTracking, rotateX, rotateY]);

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        perspective: "1000px",
        width: size,
        height: size,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (mouseTracking) {
          rotateX.set(0);
          rotateY.set(0);
        }
      }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, ${color}, ${color}DD)`,
          boxShadow: `
            inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0, 0, 0, 0.3),
            inset ${size * 0.1}px ${size * 0.1}px ${size * 0.2}px rgba(255, 255, 255, 0.4),
            0 ${size * 0.1}px ${size * 0.3}px rgba(0, 0, 0, 0.2)
          `,
          position: "relative",
          transformStyle: "preserve-3d",
          rotateX: mouseTracking ? rotateX : undefined,
          rotateY: mouseTracking ? rotateY : undefined,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        {/* Highlight */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "20%",
            width: "30%",
            height: "30%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </div>
  );
}

// ============================================================================
// STAR 3D COMPONENT
// ============================================================================

interface Star3DProps {
  size?: number;
  color?: string;
  mouseTracking?: boolean;
  autoRotate?: boolean;
  className?: string;
}

export function Star3D({
  size = 100,
  color = "#F2C94C",
  mouseTracking = true,
  autoRotate = true,
  className = "",
}: Star3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    if (!mouseTracking || !containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const newRotateY = (deltaX / rect.width) * 60;
      const newRotateX = -(deltaY / rect.height) * 60;

      rotateY.set(newRotateY);
      rotateX.set(newRotateX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered, mouseTracking, rotateX, rotateY]);

  // Generate star SVG path
  const generateStarPath = (points = 5, outerRadius = 50, innerRadius = 20) => {
    const cx = 50;
    const cy = 50;
    let path = "";

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / points) * i - Math.PI / 2;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      path += `${i === 0 ? "M" : "L"} ${x} ${y} `;
    }
    path += "Z";
    return path;
  };

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        perspective: "1000px",
        width: size,
        height: size,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (mouseTracking) {
          rotateX.set(0);
          rotateY.set(0);
        }
      }}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
          rotateX: mouseTracking ? rotateX : undefined,
          rotateY: mouseTracking ? rotateY : undefined,
        }}
        animate={
          autoRotate
            ? {
                rotateZ: [0, 360],
              }
            : undefined
        }
        transition={
          autoRotate
            ? {
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }
            : {
                type: "spring",
                stiffness: 100,
                damping: 20,
              }
        }
      >
        {/* Front Star */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3))",
          }}
        >
          <path
            d={generateStarPath(5, 45, 18)}
            fill={color}
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="2"
          />
          {/* Inner glow */}
          <path
            d={generateStarPath(5, 30, 12)}
            fill="rgba(255, 255, 255, 0.3)"
          />
        </svg>

        {/* Back Star (depth) */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          style={{
            position: "absolute",
            transform: `translateZ(-${size * 0.2}px)`,
            filter: "brightness(0.8)",
          }}
        >
          <path
            d={generateStarPath(5, 45, 18)}
            fill={color}
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="2"
            opacity={0.6}
          />
        </svg>
      </motion.div>
    </div>
  );
}
