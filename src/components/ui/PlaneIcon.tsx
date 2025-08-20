import type { SVGProps } from 'react';

interface PlaneIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function PlaneIcon({ size = 32, className, ...props }: PlaneIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Astro-inspired plane icon */}
      {/* Main body/fuselage */}
      <path 
        d="M16 2L18.5 10H26L22 14L26 18H18.5L16 30L13.5 18H6L10 14L6 10H13.5L16 2Z" 
        fill="currentColor"
      />
      
      {/* Wing gradients for depth */}
      <path 
        d="M16 2L18.5 10H26L22 14L16 16L10 14L6 10H13.5L16 2Z" 
        fill={`url(#wingGradient-${size})`}
        fillOpacity="0.8"
      />
      
      {/* Cockpit/nose highlight */}
      <ellipse 
        cx="16" 
        cy="8" 
        rx="1.5" 
        ry="2.5" 
        fill="white" 
        fillOpacity="0.8"
      />
      
      {/* Engine nacelles */}
      <circle cx="8" cy="14" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="24" cy="14" r="1" fill="currentColor" fillOpacity="0.3" />
      
      {/* Gradient definition with unique ID based on size */}
      <defs>
        <linearGradient id={`wingGradient-${size}`} x1="16" y1="2" x2="16" y2="16">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}