"use client";

import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-between mb-10">
      <div>
        <h1 className="text-5xl font-black">Dashboard</h1>
        <p className="text-muted-foreground">Manage your prompts</p>
      </div>

      <div className="flex gap-3">
        <button
          className="border p-3 rounded-2xl"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>

        <button className="border p-3 rounded-2xl">
          <Bell />
        </button>
      </div>
    </div>
  );
}