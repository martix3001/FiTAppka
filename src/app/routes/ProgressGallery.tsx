import React, { useState } from "react";

interface PhotoDetails {
  url: string;
  date: string;
  weight: string;
}

export default function ProgressGallery() {
  const [photos, setPhotos] = useState<PhotoDetails[]>([]); // Array to store photo details
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoDetails | null>(null); // For expanded photo view
  const maxPhotos = 9;

  const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const newPhotoUrl = URL.createObjectURL(file); // Create a URL for the captured image

      if (photos.length < maxPhotos) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        // Simulated user data (replace with actual data from your database)
        const userWeight = "70kg";

        const newPhoto: PhotoDetails = {
          url: newPhotoUrl,
          date: formattedDate,
          weight: userWeight,
        };

        // Add the photo to the gallery
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
        // Set canvas dimensions to match the image
        canvas.width = image.width;
        canvas.height = image.height;
  
        // Draw the image onto the canvas
        context.drawImage(image, 0, 0);
  
        // Calculate dimensions for the text box and font size
        const boxHeight = canvas.height * 0.08; // 8% of the image height
        const boxWidth = canvas.width * 0.4; // 40% of the image width
        const fontSize = Math.floor(canvas.height * 0.04); // 4% of the image height
  
        // Add text overlay
        context.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black background
        context.fillRect(
          canvas.width - boxWidth - 10, // Position box in the bottom-right corner
          canvas.height - boxHeight - 10,
          boxWidth,
          boxHeight
        );
  
        context.fillStyle = "white"; // Text color
        context.font = `${fontSize}px Arial`; // Dynamically set font size
        context.textAlign = "right";
        context.fillText(
          selectedPhoto.date,
          canvas.width - 15, // Padding from the right edge
          canvas.height - boxHeight + fontSize / 2 - 15 // Adjust vertical alignment
        );
        context.fillText(
          `Weight: ${selectedPhoto.weight}`,
          canvas.width - 15, // Padding from the right edge
          canvas.height - 15 // Padding from the bottom edge
        );
  
        // Convert canvas to a data URL and trigger download
        const modifiedPhotoUrl = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = modifiedPhotoUrl;
        link.download = `photo-${selectedPhoto.date}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Close the expanded photo view
        setSelectedPhoto(null);
      };
    }
  };

  const handleCloseDetails = () => {
    setSelectedPhoto(null); // Close the expanded photo view
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Header */}
      <header className="bg-teal-500 w-full py-4 text-center">
        <h1 className="text-white text-lg font-bold">Fit App - Progress Gallery</h1>
      </header>

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

      {/* Add Photo Button */}
      <div className="fixed bottom-8 right-8">
        <input
          accept="image/*"
          className="hidden"
          id="camera-input"
          type="file"
          capture="environment" // Opens the camera on mobile devices
          onChange={handleAddPhoto}
        />
        <label htmlFor="camera-input">
          <div
            className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition cursor-pointer"
          >
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
