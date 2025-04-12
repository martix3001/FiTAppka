import React, { useState, useEffect } from "react";
import { getUserData } from "../../firebase/db/getUserData"; 
import useAuth from "../../contexts/auth/useAuth";

interface PhotoDetails {
  url: string;
  date: string;
  weight: string;
}

export default function ProgressGallery() {
  const [photos, setPhotos] = useState<PhotoDetails[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null);
  const [userWeight, setUserWeight] = useState<string | null>(null); 
  const maxPhotos = 9;
  const { user } = useAuth();

  
  useEffect(() => {
    const fetchWeight = async () => {
      if (user) {
        try {
          const data = await getUserData(user.uid);
          if (data && data.weight) {
            setUserWeight(`${data.weight} kg`);
          } else {
            setUserWeight("Unknown"); 
          }
        } catch (error) {
          console.error("Error fetching user weight:", error);
        }
      }
    };

    fetchWeight();
  }, [user]);

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const newPhotoUrl = URL.createObjectURL(file);

      if (photos.length < maxPhotos) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        const newPhoto: PhotoDetails = {
          url: newPhotoUrl,
          date: formattedDate,
          weight: userWeight || "Unknown", 
        };

        setPhotos([newPhoto, ...photos]);
      } else {
        alert("Maximum of 9 photos reached.");
      }
    }
  };

  const handleSavePhoto = () => {
    if (selectedPhoto) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return;

      const image = new Image();
      image.src = selectedPhoto.url;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);

        const boxHeight = canvas.height * 0.08;
        const boxWidth = canvas.width * 0.4;
        const fontSize = Math.floor(canvas.height * 0.04);

        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(
          canvas.width - boxWidth - 10,
          canvas.height - boxHeight - 10,
          boxWidth,
          boxHeight
        );

        context.fillStyle = "white";
        context.font = `${fontSize}px Arial`;
        context.textAlign = "right";
        context.fillText(
          selectedPhoto.date,
          canvas.width - 15,
          canvas.height - boxHeight + fontSize / 2 - 15
        );
        context.fillText(
          `Weight: ${selectedPhoto.weight}`,
          canvas.width - 15,
          canvas.height - 15
        );

        const modifiedPhotoUrl = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = modifiedPhotoUrl;
        link.download = `photo-${selectedPhoto.date}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setSelectedPhoto(null);
      };
    }
  };

  const handleCloseDetails = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 gap-4">
      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
        {Array.from({ length: maxPhotos }).map((_, index) => (
          <div
            key={index}
            className="relative w-full aspect-square bg-gray-300 rounded-lg overflow-hidden"
            style={{
              backgroundImage: photos[index]
                ? `url(${photos[index].url})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => photos[index] && setSelectedPhoto(photos[index])}
          >
            {photos[index] && (
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-xs p-1">
                <p>{photos[index].date}</p>
                <p>Weight: {photos[index].weight}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 right-8">
        <input
          accept="image/*"
          className="hidden"
          id="camera-input"
          type="file"
          capture="environment"
          onChange={handleAddPhoto}
        />
        <label htmlFor="camera-input">
          <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition cursor-pointer">
            <span className="text-2xl font-bold">+</span>
          </div>
        </label>
      </div>

      {/* Expanded Photo View */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center max-w-sm w-full">
            <img
              src={selectedPhoto.url}
              alt="Selected"
              className="w-full h-auto rounded-lg mb-4"
            />
            <p className="text-gray-700 font-semibold">{selectedPhoto.date}</p>
            <p className="text-gray-500">Weight: {selectedPhoto.weight}</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleSavePhoto}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={handleCloseDetails}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
