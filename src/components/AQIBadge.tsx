import { cn } from "@/lib/utils";

interface AQIBadgeProps {
  aqi: number;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  className?: string;
}

const getAQIInfo = (aqi: number) => {
  if (aqi <= 50) {
    return {
      level: "Good",
      color: "bg-aqi-good",
      textColor: "text-white",
      description: "Air quality is satisfactory",
    };
  } else if (aqi <= 100) {
    return {
      level: "Moderate",
      color: "bg-aqi-moderate",
      textColor: "text-foreground",
      description: "Acceptable for most people",
    };
  } else if (aqi <= 150) {
    return {
      level: "Unhealthy for Sensitive Groups",
      color: "bg-aqi-unhealthySensitive",
      textColor: "text-white",
      description: "Sensitive groups may experience effects",
    };
  } else if (aqi <= 200) {
    return {
      level: "Unhealthy",
      color: "bg-aqi-unhealthy",
      textColor: "text-white",
      description: "Everyone may experience effects",
    };
  } else if (aqi <= 300) {
    return {
      level: "Very Unhealthy",
      color: "bg-aqi-veryUnhealthy",
      textColor: "text-white",
      description: "Health alert: serious effects",
    };
  } else {
    return {
      level: "Hazardous",
      color: "bg-aqi-hazardous",
      textColor: "text-white",
      description: "Emergency conditions",
    };
  }
};

const AQIBadge = ({ aqi, size = "md", showLabel = true, className }: AQIBadgeProps) => {
  const info = getAQIInfo(aqi);

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
    xl: "text-2xl px-6 py-3",
  };

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full font-semibold shadow-lg",
          info.color,
          info.textColor,
          sizeClasses[size]
        )}
      >
        {aqi}
      </div>
      {showLabel && (
        <div className="flex flex-col">
          <span className="font-semibold text-sm">{info.level}</span>
          <span className="text-xs text-muted-foreground">{info.description}</span>
        </div>
      )}
    </div>
  );
};

export default AQIBadge;
