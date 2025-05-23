// src/app/providers.tsx
"use client";

import type { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children, ...props }: ThemeProviderProps & { children: ReactNode }): JSX.Element {
  return (
    <NextThemesProvider 
      {...props} 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false} 
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </NextThemesProvider>
  );
}
