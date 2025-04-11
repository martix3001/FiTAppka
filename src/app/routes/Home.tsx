import { doc, getDoc } from "firebase/firestore";
import { Droplet, Pizza, Footprints, Plus } from "lucide-react";
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
  }, []);

  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="flex flex-col gap-8 p-4 flex-grow overflow-y-auto">
          {/* Water Progress */}
          <div className="flex items-center gap-4">
            <Droplet size={40} />
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
              <div
                className="bg-blue-500 h-6 rounded-full"
                style={{ width: `${(waterProgress / 2000) * 100}%` }}
              ></div>
              <span className="absolute inset-0 flex justify-center items-center text-black font-bold">
                {`${waterProgress} / 2000 ml`}
              </span>
            </div>
          </div>

          {/* Meal Progress */}
          <div className="flex items-center gap-4">
            <Pizza size={40} />
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
              <div
                className="bg-green-500 h-6 rounded-full"
                style={{ width: `${(mealProgress / 2500) * 100}%` }}
              ></div>
              <span className="absolute inset-0 flex justify-center items-center text-black font-bold">
                {`${mealProgress} / 2500 kcal`}
              </span>
            </div>
          </div>

          {/* Steps Progress */}
          <div className="flex items-center gap-4">
            <Footprints size={40} />
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
              <div
                className="bg-yellow-500 h-6 rounded-full"
                style={{ width: `${(stepsProgress / 11000) * 100}%` }}
              ></div>
              <span className="absolute inset-0 flex justify-center items-center text-black font-bold">
                {`${stepsProgress} / 11000 steps`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Buttons Section */}
      <div className="flex flex-wrap justify-center items-center gap-6 py-4 bg-gray-100">
        <ActionTile
          icon={<Plus color="black" size={30} className="self-center" />}
          label={"Meal plan"}
          onClick={() => navigate("/dashboard/meal-plan")}
        />
        <ActionTile
          icon={<Plus color="black" size={30} className="self-center" />}
          label={"Add Water"}
          onClick={() => navigate("/dashboard/add-water")}
        />
        <ActionTile
          icon={<Plus color="black" size={30} className="self-center" />}
          label={"Register Product"}
          onClick={() => navigate("/dashboard/register-product")}
        />
        <ActionTile
          icon={<Plus color="black" size={30} className="self-center" />}
          label={"Exercise"}
          onClick={() => navigate("/dashboard/exercise")}
        />
        <ActionTile
          icon={<Plus color="black" size={30} className="self-center" />}
          label={"Progress Gallery"}
          onClick={() => navigate("/dashboard/progress-gallery")}
        />
        <ActionTile
          icon={<Plus color="black" size={30} className="self-center" />}
          label={"Settings"}
          onClick={() => navigate("/dashboard/settings")}
        />
      </div>
    </div>
  );
}
