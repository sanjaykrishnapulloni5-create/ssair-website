"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants, type HTMLMotionProps } from "framer-motion";

export type AnimationDirection = "up" | "down" | "left" | "right" | "scale";

export interface AnimatedSectionProps
  extends Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "variants" | "transition"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
  id?: string;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
  ...props
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 40, x: 0, scale: 1 };
      case "down":
        return { opacity: 0, y: -40, x: 0, scale: 1 };
      case "left":
        return { opacity: 0, x: 40, y: 0, scale: 1 };
      case "right":
        return { opacity: 0, x: -40, y: 0, scale: 1 };
      case "scale":
        return { opacity: 0, x: 0, y: 0, scale: 0.9 };
      default:
        return { opacity: 0, y: 40, x: 0, scale: 1 };
    }
  };

  const variants: Variants = {
    hidden: getInitial(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
