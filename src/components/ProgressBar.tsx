import React from "react";
import ProgressIcon from "./ProgressIcon";

interface ProgressBarProps {
  icon: React.ReactNode; // Ikona paska
  value: number; // Aktualna wartość
  maxValue: number; // Maksymalna wartość
  color: string; // Kolor paska postępu
}

export default function ProgressBar({ icon, value, maxValue, color }: ProgressBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100); // Obliczenie procentu

  return (
    <div className="flex items-center w-full mb-4">
      <ProgressIcon icon={icon} size={48} color="black" />
      <div className="flex-1 ml-4">
        <div className="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-1 text-sm text-gray-700">
          <span>{value} / {maxValue}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      </div>
    </div>
  );
}