import React from "react";

interface ProgressIconProps {
  icon: React.ReactNode; // Ikona (np. emoji lub SVG)
  size?: number; // Rozmiar ikony w pikselach (domyślnie 48px)
  color?: string; // Kolor ikony (domyślnie czarny)
}

export default function ProgressIcon({ icon, size = 48, color = "black" }: ProgressIconProps) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
        color: color,
      }}
    >
      <span style={{ fontSize: size }}>{icon}</span>
    </div>
  );
}