import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useAuth from "../../contexts/auth/useAuth";

export default function Exercise() {
  const { user } = useAuth();
  const [exercises, setExercises] = useState<{ id: string; name: string; duration: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<{ id: string; name: string; duration: number } | null>(null);
  const [timer, setTimer] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [modalExercise, setModalExercise] = useState<{ id?: string; name: string; duration: number }>({
    name: "",
    duration: 0,
  });

  // Fetch exercises from Firestore
  useEffect(() => {
    const fetchExercises = async () => {
      if (!user) return;

      try {
        const exerciseRef = collection(db, "exercises");
        const q = query(exerciseRef, where("userId", "==", user.uid)); // Fetch only the user's exercises
        const snapshot = await getDocs(q);
        const exerciseList = snapshot.docs.map((doc) => {
          const data = doc.data() as { name: string; duration: number };
          return {
            id: doc.id,
            name: data.name,
            duration: data.duration,
          };
        });
        setExercises(exerciseList);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, [user]);

  const handleAddExercise = async (name: string, duration: number) => {
    if (!user || !name || duration <= 0) {
      alert("Please provide valid exercise details.");
      return;
    }

    try {
      const newExercise = { name, duration, userId: user.uid };
      const docRef = await addDoc(collection(db, "exercises"), newExercise);
      setExercises((prev) => [...prev, { id: docRef.id, ...newExercise }]);
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  const handleEditExercise = async (id: string, updatedExercise: { name: string; duration: number }) => {
    if (!updatedExercise.name || updatedExercise.duration <= 0) {
      alert("Please provide valid exercise details.");
      return;
    }

    try {
      const exerciseRef = doc(db, "exercises", id);
      await updateDoc(exerciseRef, updatedExercise);
      setExercises((prev) =>
        prev.map((exercise) => (exercise.id === id ? { ...exercise, ...updatedExercise } : exercise))
      );
    } catch (error) {
      console.error("Error editing exercise:", error);
    }
  };

  const handleDeleteExercise = async (id: string) => {
    try {
      await deleteDoc(doc(db, "exercises", id));
      setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const handlePlayExercise = (exercise: { id: string; name: string; duration: number }) => {
    setCurrentExercise(exercise);
    setTimer(exercise.duration * 60); // Convert minutes to seconds
    setIsPlaying(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  const openModal = (type: "add" | "edit", exercise?: { id: string; name: string; duration: number }) => {
    setModalType(type);
    setModalExercise(exercise || { name: "", duration: 0 });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalExercise({ name: "", duration: 0 });
  };

  const handleModalSubmit = () => {
    if (modalType === "add") {
      handleAddExercise(modalExercise.name, modalExercise.duration);
    } else if (modalType === "edit" && modalExercise.id) {
      handleEditExercise(modalExercise.id, { name: modalExercise.name, duration: modalExercise.duration });
    }
    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Exercise Page</h1>
      <button
        onClick={() => openModal("add")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Exercise
      </button>
      <div className="space-y-4 mt-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{exercise.name}</h2>
              <p className="text-sm text-gray-600">Duration: {exercise.duration} min</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePlayExercise(exercise)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Play
              </button>
              <button
                onClick={() => openModal("edit", exercise)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteExercise(exercise.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Timer Modal */}
      {isPlaying && currentExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">{currentExercise.name}</h2>
            <p className="text-lg font-semibold mb-4">
              Time Remaining: {Math.floor(timer / 60)}:
              {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
            </p>
            <button
              onClick={() => setIsPlaying(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "add" ? "Add Exercise" : "Edit Exercise"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={modalExercise.name}
                onChange={(e) => setModalExercise({ ...modalExercise, name: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                value={modalExercise.duration}
                onChange={(e) =>
                  setModalExercise({ ...modalExercise, duration: parseInt(e.target.value) || 0 })
                }
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}
