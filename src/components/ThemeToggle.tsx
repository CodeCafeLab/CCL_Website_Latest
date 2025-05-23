// This component is no longer needed as only dark mode is supported.
// It has been removed from the Header. You can safely delete this file.

"use client";

import * as React from "react";
// import { Moon, Sun } from "lucide-react"; // Not needed
// import { useTheme } from "next-themes"; // Not needed

// import { Button } from "@/components/ui/button"; // Not needed
// import { // Not needed
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  // const { setTheme } = useTheme(); // Not needed

  // The toggle functionality is removed as the site is now dark-mode only.
  return null;

  /*
  Original content:
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  */
}
