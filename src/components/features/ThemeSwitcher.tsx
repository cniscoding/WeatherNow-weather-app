"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="flex items-center justify-end">
       <p className="truncate text-xs md:text-md lg:text-lg">Theme : </p><strong className="text-xs md:text-md lg:text-lg m-1">{theme?.toUpperCase()}</strong>
      <Switch className="m-2" onClick={toggleTheme}>Toggle Theme</Switch>
    </div>
  )
};