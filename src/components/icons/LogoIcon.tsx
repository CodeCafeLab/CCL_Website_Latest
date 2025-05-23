
import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 40"
      width="120" // Default width, can be overridden by props
      height="30" // Default height, can be overridden by props
      aria-labelledby="logoTitle"
      role="img"
      {...props} // className will be passed here, e.g., h-8 w-auto
    >
      <title id="logoTitle">CodeCafe Lab Logo</title>
      {/* Angled bracket < */}
      {/* Uses primary theme color */}
      <path d="M30 0 L0 20 L30 40" fill="hsl(var(--primary))" />
      
      {/* Coffee cup */}
      {/* Uses accent theme color for strokes */}
      <g transform="translate(12, 10) scale(0.7)">
        <path d="M0 5C0 2.23858 2.23858 0 5 0H15C17.7614 0 20 2.23858 20 5V12C20 14.7614 17.7614 17 15 17H12C9.23858 17 7 14.7614 7 12V10" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" />
        <path d="M7 10H0" stroke="hsl(var(--accent))" strokeWidth="2" />
        <path d="M10 3V1" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 3V1" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      
      {/* Angled bracket > */}
      {/* This color #FFA500 is specific. Kept as is. If it needs to be themed, it should map to a semantic theme variable. */}
      <path d="M35 0 L65 20 L35 40" fill="#FFA500" /> 
      
      {/* Text "LAB" */}
      {/* Uses accent theme color */}
      <text x="75" y="27" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="hsl(var(--accent))">
        LAB
      </text>
    </svg>
  );
}
