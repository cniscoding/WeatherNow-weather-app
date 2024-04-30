"use client";

import {useTheme} from "next-themes";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export function TemperatureToggle({ onChange }) {
  const [isCelsius, setIsCelsius] = useState(true);
  const { theme, setTheme } = useTheme()

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
    onChange(!isCelsius); // Notify parent component of the change
  };

  return (
    <div className="flex items-center justify-end">
      <p className="truncate text-xs md:text-md lg:text-lg">Temperature : °</p><strong className="text-xs md:text-md lg:text-lg">{isCelsius ? "C" : "F"}</strong>
      <Switch className="m-2" onClick={toggleTemperatureUnit} />
    </div>
  );
}
