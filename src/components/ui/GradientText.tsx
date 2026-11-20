"use client";

import type { ReactNode, CSSProperties, HTMLAttributes } from "react";

export interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
  shimmer?: boolean;
  style?: CSSProperties;
}

const normalizeGradientClass = (
  val: string | undefined,
  type: "from" | "via" | "to"
) => {
  if (!val) return "";
  if (val.startsWith(`${type}-`)) return val;
  if (val.startsWith("#") || val.startsWith("rgb") || val.startsWith("hsl")) {
    return `${type}-[${val}]`;
  }
  return `${type}-${val}`;
};

export function GradientText({
  children,
  className = "",
  from = "from-blue-400",
  via,
  to = "to-cyan-400",
  animate = false,
  shimmer = false,
  style,
  ...props
}: GradientTextProps) {
  const isShimmer = Boolean(shimmer || animate);

  const fromClass = normalizeGradientClass(from, "from");
  const viaClass = via ? normalizeGradientClass(via, "via") : "";
  const toClass = normalizeGradientClass(to, "to");

  const classes = [
    "inline-block",
    "bg-gradient-to-r",
    fromClass,
    viaClass,
    toClass,
    "bg-clip-text",
    "text-transparent",
    isShimmer ? "animate-shimmer bg-[length:200%_auto]" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const combinedStyles: CSSProperties = {
    ...style,
    ...(isShimmer
      ? {
          backgroundSize: "200% auto",
          animation: "shimmer 4s ease infinite",
        }
      : {}),
  };

  return (
    <span className={classes} style={combinedStyles} {...props}>
      {children}
    </span>
  );
}

export default GradientText;
