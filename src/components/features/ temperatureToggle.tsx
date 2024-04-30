"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/Switch";

export function TemperatureToggle({ onChange }) {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
    onChange(!isCelsius); // Notify parent component of the change
  };

  return (
    <div className="flex items-center justify-end">
      <div className="text-sm font-medium">Temperature Scale °{isCelsius ? "C" : "F"}</div>
      <Switch className="m-2" onClick={toggleTemperatureUnit} />
    </div>
  );
}