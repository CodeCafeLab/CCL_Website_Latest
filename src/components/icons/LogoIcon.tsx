
import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 42" // Aspect ratio roughly 4:3, similar to the provided image
      aria-labelledby="logoTitle"
      role="img"
      {...props} // className (e.g., h-8 w-auto) will be passed here
    >
      <title id="logoTitle">CodeCafe Lab Logo</title>
      
      {/* Left Chevron (Yellow) - Uses primary theme color */}
      <path 
        d="M26 4 L4 21 L26 38 L32 38 L10 21 L32 4 Z" 
        fill="hsl(var(--primary))" 
      />
      
      {/* Right Chevron (Orange) - Specific color #FFA500 */}
      <path 
        d="M30 4 L52 21 L30 38 L24 38 L46 21 L24 4 Z" 
        fill="#FFA500"
      />
      
      {/* Coffee Cup Group - Centered */}
      <g>
        {/* Cup body (outline) - Uses muted-foreground theme color */}
        <path 
          d="M23 24 C22 21 34 21 33 24 L33 27 C34 30 22 30 23 27 Z" 
          fill="hsl(var(--muted-foreground))" 
        />
        {/* Cup liquid - Uses accent theme color (green) */}
        <ellipse 
          cx="28" 
          cy="24.5" // Centered within the cup body
          rx="4" 
          ry="1.8" 
          fill="hsl(var(--accent))" 
        />
         {/* Cup Handle - Uses muted-foreground theme color */}
        <path 
          d="M33 23 C35 23 35.5 26 33 26" // Adjusted to connect to new cup body
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.3" // Slightly thicker for visibility
          fill="none"
          strokeLinecap="round"
        />
        {/* Steam lines - Uses muted-foreground theme color */}
        <path d="M25 20 Q26 18 25 16" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M28 21 Q29 19 28 17" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M31 20 Q32 18 31 16" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
