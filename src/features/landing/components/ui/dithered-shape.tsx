"use client";
import React, { useMemo } from 'react';

interface DitheredShapeProps {
  className?: string;
  type?: 'circle' | 'square' | 'triangle';
  color?: string;
  size?: number;
}

const DitheredShape = ({ className, type = 'circle', color = 'black', size = 100 }: DitheredShapeProps) => {
  const patternId = useMemo(() => `dither-pattern-${Math.random().toString(36).substr(2, 9)}`, []);

  const renderShape = () => {
    switch (type) {
      case 'square':
        return <rect x="5" y="5" width={size - 10} height={size - 10} fill={`url(#${patternId})`} stroke="black" strokeWidth="1" />;
      case 'triangle':
        return <polygon points={`${size / 2},5 ${size - 5},${size - 5} 5,${size - 5}`} fill={`url(#${patternId})`} stroke="black" strokeWidth="1" />;
      case 'circle':
      default:
        return <circle cx={size / 2} cy={size / 2} r={size / 2 - 5} fill={`url(#${patternId})`} stroke="black" strokeWidth="1" />;
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`} 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={patternId} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="1" height="1" x="0" y="0" fill={color} />
          <rect width="1" height="1" x="2" y="2" fill={color} />
        </pattern>
      </defs>
      {renderShape()}
    </svg>
  );
};

export default DitheredShape;