"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Lock, Star, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeStatus = "not-started" | "in-progress" | "completed" | "locked" | "mastered";
type BadgeSize = "sm" | "md" | "lg";
type BadgeVariant = "default" | "minimal" | "pill";

interface ProgressBadgeProps {
  status: BadgeStatus;
  size?: BadgeSize;
  variant?: BadgeVariant;
  label?: string;
  animate?: boolean;
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function ProgressBadge({
  status,
  size = "md",
  variant = "default",
  label,
  animate = true,
  showIcon = true,
  className = "",
  onClick,
}: ProgressBadgeProps) {
  const statusConfig = {
    "not-started": {
      icon: Circle,
      label: label || "Not Started",
      colors: "bg-gray-100 text-gray-700 border-gray-300",
      iconColor: "text-gray-400",
    },
    "in-progress": {
      icon: Clock,
      label: label || "In Progress",
      colors: "bg-blue-100 text-blue-700 border-blue-300",
      iconColor: "text-blue-500",
    },
    completed: {
      icon: CheckCircle2,
      label: label || "Completed",
      colors: "bg-green-100 text-green-700 border-green-300",
      iconColor: "text-green-500",
    },
    locked: {
      icon: Lock,
      label: label || "Locked",
      colors: "bg-gray-100 text-gray-500 border-gray-300",
      iconColor: "text-gray-400",
    },
    mastered: {
      icon: Star,
      label: label || "Mastered",
      colors: "bg-yellow-100 text-yellow-700 border-yellow-300",
      iconColor: "text-yellow-500",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: {
      container: "px-2 py-1 text-xs",
      icon: "h-3 w-3",
      gap: "gap-1",
    },
    md: {
      container: "px-3 py-1.5 text-sm",
      icon: "h-4 w-4",
      gap: "gap-1.5",
    },
    lg: {
      container: "px-4 py-2 text-base",
      icon: "h-5 w-5",
      gap: "gap-2",
    },
  };

  const variantClasses = {
    default: "rounded-lg border-2",
    minimal: "rounded-md border",
    pill: "rounded-full border-2",
  };

  const baseClasses = cn(
    "inline-flex items-center font-semibold transition-all",
    config.colors,
    sizeClasses[size].container,
    sizeClasses[size].gap,
    variantClasses[variant],
    onClick && "cursor-pointer hover:opacity-80 active:scale-95",
    className
  );

  const content = (
    <>
      {showIcon && <Icon className={cn(sizeClasses[size].icon, config.iconColor)} />}
      <span>{config.label}</span>
    </>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={baseClasses}
        onClick={onClick}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {content}
    </div>
  );
}

// Convenience components for common use cases
export function CompletedBadge(props: Omit<ProgressBadgeProps, "status">) {
  return <ProgressBadge status="completed" {...props} />;
}

export function InProgressBadge(props: Omit<ProgressBadgeProps, "status">) {
  return <ProgressBadge status="in-progress" {...props} />;
}

export function NotStartedBadge(props: Omit<ProgressBadgeProps, "status">) {
  return <ProgressBadge status="not-started" {...props} />;
}

export function LockedBadge(props: Omit<ProgressBadgeProps, "status">) {
  return <ProgressBadge status="locked" {...props} />;
}

export function MasteredBadge(props: Omit<ProgressBadgeProps, "status">) {
  return <ProgressBadge status="mastered" {...props} />;
}
