import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../contexts/auth/useAuth";
import { updateUserData } from "../../firebase/db/updateUserData";
import { getUserData } from "../../firebase/db/getUserData";

export default function Settings() {
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  const [isEditingHeight, setIsEditingHeight] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await getUserData(user.uid);
          if (data) {
            setWeight(data.weight || 0);
            setHeight(data.height || 0);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleSave = async () => {
    if (user && weight !== null && height !== null) {
      try {
        await updateUserData(user.uid, { weight, height });
        alert("Data saved successfully!");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error saving data:", error);
        alert("Failed to save data.");
      }
    } else {
      alert("No user logged in or invalid data.");
    }
  };

  const generateOptions = (min: number, max: number, step: number) => {
    const options = [];
    for (let i = min; i <= max; i += step) {
      options.push(i);
    }
    return options;
  };

  const Picker: React.FC<{
    options: number[];
    value: number;
    onChange: (value: number) => void;
  }> = ({ options, value, onChange }) => {
    const handleOptionClick = (event: React.MouseEvent, option: number) => {
      event.preventDefault();
      if (value !== option) {
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
        onChange(option);
      }
    };

    return (
      <div className="h-40 w-24 overflow-y-scroll snap-y snap-mandatory scrollbar-hide border rounded-lg">
        {options.map((option) => (
          <div
            key={option}
            className={`snap-center text-center py-2 cursor-pointer ${
              value === option ? "text-black font-bold text-lg" : "text-gray-500"
            }`}
            onClick={(event) => handleOptionClick(event, option)} // Pass the event to the handler
          >
            {option}
          </div>
        ))}
      </div>
    );
  };

  if (weight === null || height === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-20 min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        {/* Weight Section */}
        <div className="mb-6 w-full flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Weight (kg)</h2>
            {!isEditingWeight ? (
              <p className="text-gray-700">{weight} kg</p>
            ) : (
              <Picker
                options={generateOptions(40, 150, 0.5)}
                value={weight}
                onChange={setWeight}
              />
            )}
          </div>
          <button
            onClick={() => setIsEditingWeight(!isEditingWeight)}
            className="text-teal-500 font-semibold hover:underline"
          >
            {isEditingWeight ? "Done" : "Edit"}
          </button>
        </div>

        {/* Height Section */}
        <div className="mb-6 w-full flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Height (cm)</h2>
            {!isEditingHeight ? (
              <p className="text-gray-700">{height} cm</p>
            ) : (
              <Picker
                options={generateOptions(100, 250, 1)}
                value={height}
                onChange={setHeight}
              />
            )}
          </div>
          <button
            onClick={() => setIsEditingHeight(!isEditingHeight)}
            className="text-teal-500 font-semibold hover:underline"
          >
            {isEditingHeight ? "Done" : "Edit"}
          </button>
        </div>

        <button
          onClick={handleSave}
          className="bg-teal-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-600 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
