"use client";

import type React from "react";

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

export interface GlassIconProps {
  icon: React.ReactElement;
  color: string;
  label?: string;
  className?: string;
  showLabel?: boolean;
  onClick?: () => void;
}

const gradientMapping: Record<string, string> = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
  brand: "linear-gradient(135deg, #3c315b 0%, #5a4b82 100%)",
  whatsapp: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
};

export const getGlassBackgroundStyle = (color: string): React.CSSProperties => {
  if (gradientMapping[color]) {
    return { background: gradientMapping[color] };
  }
  return { background: color };
};

export function GlassIcon({
  icon,
  color,
  label,
  className,
  showLabel = false,
  onClick,
}: GlassIconProps) {
  const backgroundStyle = getGlassBackgroundStyle(color);

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      aria-label={label}
      className={`text-base relative bg-transparent outline-none border-none cursor-pointer w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group select-none ${
        className || ""
      }`}
    >
      <span
        className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] [will-change:transform] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)] group-active:[transform:rotate(20deg)_translate3d(-0.3em,-0.3em,0.3em)]"
        style={{
          ...backgroundStyle,
          boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
        }}
      />

      <span
        className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex transform group-hover:[transform:translate3d(0,0,2em)] group-active:[transform:translate3d(0,0,1em)]"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
        }}
      >
        <span
          className="m-auto flex h-[1.5em] w-[1.5em] items-center justify-center text-white"
          aria-hidden="true"
        >
          {icon}
        </span>
      </span>

      {label && showLabel && (
        <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
          {label}
        </span>
      )}
    </div>
  );
}

export const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  return (
    <div
      className={`grid gap-[5em] grid-cols-2 md:grid-cols-3 mx-auto py-[3em] overflow-visible ${
        className || ""
      }`}
    >
      {items.map((item) => (
        <GlassIcon
          key={item.label}
          icon={item.icon}
          color={item.color}
          label={item.label}
          showLabel
          className={item.customClass}
        />
      ))}
    </div>
  );
};

export default GlassIcons;
