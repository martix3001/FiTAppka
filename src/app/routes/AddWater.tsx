import React, { useState, useEffect } from "react";

export default function AddWater() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [inputValue, setInputValue] = useState("");

  // Reset water intake daily (example: at midnight)
  useEffect(() => {
    const now = new Date();
    const millisUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
      now.getTime();

    const resetTimer = setTimeout(() => {
      setWaterIntake(0);
    }, millisUntilMidnight);

    return () => clearTimeout(resetTimer);
  }, [waterIntake]);

  const handleAddWater = () => {
    const ml = parseInt(inputValue, 10);
    if (!isNaN(ml) && ml > 0) {
      setWaterIntake(waterIntake + ml);
      setInputValue("");
    } else {
      alert("Please enter a valid number of milliliters.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <header className="bg-blue-500 w-full py-4 text-center">
        <h1 className="text-white text-lg font-bold">Add Water</h1>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Track Your Daily Water Intake
        </h2>
        <p className="text-gray-600 mb-6">
          Today's Water Intake: <span className="font-bold">{waterIntake} ml</span>
        </p>
        <input
          type="number"
          placeholder="Enter ml"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          onClick={handleAddWater}
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Add Water
        </button>
      </div>
    </div>
  );
}
