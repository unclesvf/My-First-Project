"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type TrendDirection = "up" | "down" | "neutral";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    direction: TrendDirection;
    value: string;
    label?: string;
  };
  color?: "primary" | "green" | "blue" | "purple" | "amber" | "red" | "gray";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "primary",
  size = "md",
  animate = true,
  className = "",
  onClick,
}: StatsCardProps) {
  const colorConfig = {
    primary: {
      bg: "bg-primary-50",
      icon: "bg-primary-100 text-primary-600",
      text: "text-primary-900",
      value: "text-primary-700",
    },
    green: {
      bg: "bg-green-50",
      icon: "bg-green-100 text-green-600",
      text: "text-green-900",
      value: "text-green-700",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-100 text-blue-600",
      text: "text-blue-900",
      value: "text-blue-700",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "bg-purple-100 text-purple-600",
      text: "text-purple-900",
      value: "text-purple-700",
    },
    amber: {
      bg: "bg-amber-50",
      icon: "bg-amber-100 text-amber-600",
      text: "text-amber-900",
      value: "text-amber-700",
    },
    red: {
      bg: "bg-red-50",
      icon: "bg-red-100 text-red-600",
      text: "text-red-900",
      value: "text-red-700",
    },
    gray: {
      bg: "bg-gray-50",
      icon: "bg-gray-100 text-gray-600",
      text: "text-gray-900",
      value: "text-gray-700",
    },
  };

  const sizeConfig = {
    sm: {
      padding: "p-4",
      titleSize: "text-sm",
      valueSize: "text-2xl",
      iconSize: "h-4 w-4",
      iconPadding: "p-2",
    },
    md: {
      padding: "p-6",
      titleSize: "text-base",
      valueSize: "text-3xl",
      iconSize: "h-5 w-5",
      iconPadding: "p-3",
    },
    lg: {
      padding: "p-8",
      titleSize: "text-lg",
      valueSize: "text-4xl",
      iconSize: "h-6 w-6",
      iconPadding: "p-4",
    },
  };

  const trendIcons = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  };

  const trendColors = {
    up: "text-green-600 bg-green-100",
    down: "text-red-600 bg-red-100",
    neutral: "text-gray-600 bg-gray-100",
  };

  const colors = colorConfig[color];
  const sizes = sizeConfig[size];

  const cardClasses = cn(
    "rounded-xl border-2 border-gray-200 transition-all",
    colors.bg,
    sizes.padding,
    onClick && "cursor-pointer hover:border-gray-300 hover:shadow-md active:scale-[0.98]",
    className
  );

  const content = (
    <>
      {/* Header with Icon */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className={cn("font-semibold", colors.text, sizes.titleSize)}>
            {title}
          </h3>
        </div>
        {Icon && (
          <div className={cn("rounded-lg", colors.icon, sizes.iconPadding)}>
            <Icon className={sizes.iconSize} />
          </div>
        )}
      </div>

      {/* Value */}
      <div className={cn("mb-2 font-bold", colors.value, sizes.valueSize)}>
        {value}
      </div>

      {/* Subtitle or Trend */}
      {(subtitle || trend) && (
        <div className="flex items-center gap-2">
          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold",
                trendColors[trend.direction]
              )}
            >
              {trend.direction !== "neutral" && (
                <>
                  {trend.direction === "up" && <TrendingUp className="h-3 w-3" />}
                  {trend.direction === "down" && <TrendingDown className="h-3 w-3" />}
                </>
              )}
              <span>{trend.value}</span>
            </div>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600">
              {trend && trend.label ? trend.label : subtitle}
            </p>
          )}
        </div>
      )}
    </>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cardClasses}
        onClick={onClick}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {content}
    </div>
  );
}
