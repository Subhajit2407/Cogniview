"use client";

import { useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  animationType?: "pulse" | "spotlight" | "bounce" | "glow";
}

export const AnimatedButton = ({
  children,
  className,
  variant = "primary",
  size = "default",
  icon = <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={16} />,
  iconPosition = "right",
  animationType = "pulse",
  ...props
}: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-[#FFE066] to-[#FFA500] hover:from-[#FFA500] hover:to-[#FFE066] text-[#0A0B14] font-['Urbanist'] font-bold shadow-lg shadow-[#FFE066]/20";
      case "secondary":
        return "bg-[#121327] hover:bg-[#1A1B31] border border-[#252641] hover:border-[#FFE066]/50 text-[#E2E4ED] font-['Urbanist'] font-medium";
      case "outline":
        return "bg-transparent border-2 border-[#252641] hover:border-[#FFE066] text-[#E2E4ED] hover:text-[#FFE066] font-['Urbanist'] font-medium";
      default:
        return "bg-[#FFE066] hover:bg-[#FFE066]/90 text-[#0A0B14] font-['Urbanist'] font-bold";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "text-sm py-2 px-4";
      case "lg":
        return "text-lg py-3 px-6";
      default:
        return "text-base py-2.5 px-5";
    }
  };

  const getAnimationStyles = () => {
    switch (animationType) {
      case "spotlight":
        return "relative overflow-hidden before:absolute before:inset-0 before:bg-white before:opacity-0 before:transition-opacity hover:before:opacity-10 before:rounded-full before:scale-0 hover:before:scale-150 before:aspect-square before:left-[var(--x)] before:top-[var(--y)] before:transition-transform before:duration-500 before:origin-center";
      case "bounce":
        return "transition-transform hover:-translate-y-1 active:translate-y-0";
      case "glow":
        return "transition-shadow hover:shadow-[0_0_15px_5px_rgba(255,224,102,0.3)]";
      case "pulse":
      default:
        return "transition-transform hover:scale-105 active:scale-95";
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (animationType === "spotlight") {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      button.style.setProperty("--x", `${x}px`);
      button.style.setProperty("--y", `${y}px`);
    }
  };

  return (
    <Button
      className={cn(
        "relative rounded-lg transition-all duration-300 group",
        getVariantStyles(),
        getSizeStyles(),
        getAnimationStyles(),
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {iconPosition === "left" && icon}
      <span>{children}</span>
      {iconPosition === "right" && icon}
    </Button>
  );
}; 