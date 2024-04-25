import { weatherIconMap } from "@/lib/weatherIconMap";
import Image from "next/image";

interface IconComponentProps {
  weatherCode?: number;
  className?: string;
}

export default function IconComponent({
  weatherCode,
  className,
}: IconComponentProps) {
  // Need a weather code to render the proper Icon
  if (!weatherCode) return null;
  const iconName = weatherIconMap[weatherCode];

  return (
    <div className={`relative invert-0 dark:invert ${className}`}>
      <Image
        fill
        alt={iconName.toString()}
        src={`/icons/wi-${iconName}.svg`}
        className="select-none"
      />
    </div>
  );
}