"use client";
import React from "react";

export default function RecipeModal({ meal, onClose }) {
  if (!meal) return null;

  const ingredients = meal.recipe?.ingredients || [];
  const steps = meal.recipe?.steps || [];

  // Convert YouTube URL → Embed URL
  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    try {
      if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
      if (url.includes("youtu.be/")) {
        const id = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch {
      return null;
    }
  };

  const embedUrl = getYoutubeEmbed(meal.youtubeUrl);
  const [showVideo, setShowVideo] = React.useState(false);

  // Thumbnail
  const getYoutubeId = (url) => {
    try {
      if (!url) return null;
      if (url.includes("watch?v=")) return url.split("watch?v=")[1];
      if (url.includes("youtu.be/")) return url.split("youtu.be/")[1];
      return null;
    } catch {
      return null;
    }
  };

  const thumb = getYoutubeId(meal.youtubeUrl)
    ? `https://i.ytimg.com/vi/${getYoutubeId(meal.youtubeUrl)}/hqdefault.jpg`
    : null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      {/* Dim Background */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* SMALL POPUP CARD */}
      <div
        className="relative w-[92%] max-w-md bg-black/60 backdrop-blur-xl 
        border border-white/10 rounded-2xl p-5 shadow-xl 
        animate-[fadeIn_0.25s_ease,zoomIn_0.2s_ease]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-300 hover:text-white 
          bg-white/10 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-green-300">{meal.title}</h2>
        <p className="text-gray-300 text-sm mt-1">
          {meal.calories} kcal • {meal.readyInMinutes} min
        </p>

        {/* Small Video Preview */}
        {embedUrl && (
          <div className="mt-4">
            {!showVideo ? (
              <div
                className="relative h-40 rounded-xl overflow-hidden cursor-pointer 
                border border-white/10 bg-black/30 group"
                onClick={() => setShowVideo(true)}
              >
                <img
                  src={thumb}
                  alt="thumb"
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm 
                  flex items-center justify-center text-white text-2xl group-hover:bg-white/30"
                  >
                    ▶
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-40 rounded-xl overflow-hidden border border-white/10">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}

            <a
              href={meal.youtubeUrl}
              target="_blank"
              className="text-cyan-300 hover:underline text-sm mt-1 block"
            >
              Open on YouTube →
            </a>
          </div>
        )}

        {/* Ingredients */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-green-300">Ingredients</h3>
          {ingredients.length ? (
            <ul className="text-gray-300 text-sm mt-1 list-disc ml-4 space-y-1">
              {ingredients.slice(0, 5).map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Not available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
