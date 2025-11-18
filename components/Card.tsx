"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  value?: string | number;
  children?: React.ReactNode;
  loading?: boolean;
  variant?: "default" | "stat" | "compact";
  className?: string;
}

export default function Card({
  title,
  value,
  children,
  loading = false,
  variant = "default",
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl border bg-white shadow-sm transition-all",
        "dark:bg-neutral-900 dark:border-neutral-800 dark:text-white",
        "hover:shadow-md",
        variant === "compact" && "p-4",
        className
      )}
    >
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 tracking-wide uppercase">
        {loading ? (
          <div className="h-3 w-24 bg-gray-200 dark:bg-neutral-700 animate-pulse rounded" />
        ) : (
          title
        )}
      </h3>

      <div className="mt-4">
        {loading ? (
          <div className="h-8 w-32 bg-gray-200 dark:bg-neutral-700 animate-pulse rounded" />
        ) : variant === "stat" ? (
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            {value ?? children}
          </p>
        ) : (
          <div className="text-lg text-gray-900 dark:text-white font-medium">
            {children ?? value}
          </div>
        )}
      </div>
    </div>
  );
            }
