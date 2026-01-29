"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  barColor?: string;
  backgroundColor?: string;
  height?: "sm" | "md" | "lg";
  animate?: boolean;
}

export default function ProgressBar({
  current,
  total,
  label,
  showPercentage = true,
  className = "",
  barColor = "bg-primary-600",
  backgroundColor = "bg-gray-200",
  height = "md",
  animate = true,
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  const heightClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Label and Percentage */}
      {(label || showPercentage) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          {label && <span className="font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-gray-600">
              {current} / {total} ({percentage}%)
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div
        className={cn(
          "w-full overflow-hidden rounded-full",
          backgroundColor,
          heightClasses[height]
        )}
      >
        {animate ? (
          <motion.div
            className={cn("h-full rounded-full", barColor)}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.1,
            }}
          />
        ) : (
          <div
            className={cn("h-full rounded-full transition-all duration-500", barColor)}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}
