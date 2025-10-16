"use client";

import { useTheme } from "./ThemeProvider";
import { Switch } from "@/components/ui/switch"; // shadcn switch path
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-3">
      <Switch checked={isDark} onCheckedChange={handleToggle} />
    </div>
  );
}
