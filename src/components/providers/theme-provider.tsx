"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

import Icon from "@/components/common/Icon";
import { Button } from "@/components/ui/button";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-muted-foreground hover:text-accent-foreground p-0 aspect-square border border-border rounded-2xl rounded-br-sm"
    >
      <Icon
        name={theme === "light" ? "sun" : "moon-full"}
        className="text-inherit"
      />
    </Button>
  );
};
