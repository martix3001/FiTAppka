import { doc, getDoc } from "firebase/firestore";
import { Droplet, Pizza, Footprints, Plus, Users, Camera } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ActionTile from "../../components/ActionTile";
import { db } from "../../firebase/firebase";
import useAuth from "../../contexts/auth/useAuth";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [waterProgress, setWaterProgress] = useState(0);
  const [mealProgress, setMealProgress] = useState(0);
  const [stepsProgress, setStepsProgress] = useState(0);

  const waterMax = 2000;
  const mealMax = 2500;
  const stepsMax = 11000;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const userId = user.uid; // Replace with actual user ID
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            setWaterProgress(data.water || 0);
            setMealProgress(data.calories || 0);
            setStepsProgress(data.steps || 0);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchData();
  });

  return (
    <div className="flex flex-col h-svh justify-around">
      {/* Progress Bars Container */}
      <div className="flex flex-col gap-12  p-4">
        {/* Water Progress */}
        <div className="flex items-center gap-4">
          <Droplet size={40} color="grey"/>
          <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
            <div
              className="bg-blue-500 h-6 rounded-full"
              style={{
                width: `${Math.min((waterProgress / waterMax) * 100, 100)}%`,
              }}
            ></div>
            <span className="absolute inset-0 flex justify-center items-center text-black font-bold">
              {waterProgress >= waterMax
                ? "Done for today!"
                : `${waterProgress} / ${waterMax} ml`}
            </span>
          </div>
        </div>

        {/* Meal Progress */}
        <div className="flex items-center gap-4">
          <Pizza size={40} color="grey"/>
          <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
            <div
              className="bg-green-500 h-6 rounded-full"
              style={{
                width: `${Math.min((mealProgress / mealMax) * 100, 100)}%`,
              }}
            ></div>
            <span className="absolute inset-0 flex justify-center items-center text-black font-bold">
              {mealProgress >= mealMax
                ? "Done for today!"
                : `${mealProgress} / ${mealMax} kcal`}
            </span>
          </div>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center gap-4">
          <Footprints size={40} color="grey"/>
          <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
            <div
              className="bg-yellow-500 h-6 rounded-full"
              style={{
                width: `${Math.min((stepsProgress / stepsMax) * 100, 100)}%`,
              }}
            ></div>
            <span className="absolute inset-0 flex justify-center items-center text-black font-bold">
              {stepsProgress >= stepsMax
                ? "Done for today!"
                : `${stepsProgress} / ${stepsMax} steps`}
            </span>
          </div>
        </div>
      </div>

      {/* Feature Buttons Container */}
      <div className="flex flex-wrap justify-center items-center gap-6 py-4 bg-gray-100">
        <ActionTile
          icon={<Plus color="black" size={30} className="self-center" />}
          label={"Meal plan"}
          onClick={() => navigate("/dashboard/meal-plan")}
        />
        <ActionTile
          icon={<Droplet color="black" size={30} className="self-center" />}
          label={"Add Water"}
          onClick={() => navigate("/dashboard/add-water")}
        />
        <ActionTile
          icon={<Plus color="black" size={30} className="self-center" />}
          label={"Register Product"}
          onClick={() => navigate("/dashboard/register-product")}
        />
        <ActionTile
          icon={<Users color="black" size={30} className="self-center" />}
          label={"About"}
          onClick={() => navigate("/dashboard/about")}
        />
        <ActionTile
          icon={<Camera color="black" size={30} className="self-center" />}
          label={"Progress Gallery"}
          onClick={() => navigate("/dashboard/progress-gallery")}
        />
        <ActionTile
          icon={""}
          label={""}
          onClick={() => navigate("/dashboard")}
        />
      </div>
    </div>
  );
}
