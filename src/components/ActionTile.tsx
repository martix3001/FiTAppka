import React from "react";

interface ActionTileProps {
  icon: React.ReactNode; // Ikona kafelka
  label: string; // Tekst kafelka
  onClick: () => void; // Funkcja wywoływana po kliknięciu
}

export default function ActionTile({ icon, label, onClick }: ActionTileProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4 cursor-pointer size-24 hover:bg-gray-100 transition"
      // style={{ width: "80px", height: "80px" }}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}
