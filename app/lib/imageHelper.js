// Helper to construct image paths for meals, workouts, and recipes.
// Use public/images/{category}/{id}.jpg as primary convention.
export function getImagePath(category, idOrFilename) {
  if (!category || !idOrFilename) return "/images/placeholder.svg";
  // If idOrFilename already looks like a path, return it (allow full URLs)
  if (typeof idOrFilename === "string" && (idOrFilename.startsWith("/") || idOrFilename.startsWith("http"))) {
    return idOrFilename;
  }

  // Normalize: prefer jpg, but allow caller to pass filename with extension
  const filename = idOrFilename.includes(".") ? idOrFilename : `${idOrFilename}.jpg`;
  return `/images/${category}/${filename}`;
}

export function mealImage(category = "diet", meal) {
  // meal may be an object with .image or .id or .name
  if (!meal) return "/images/placeholder.svg";
  if (meal.image) return meal.image;
  const id = meal.id || (meal.name && meal.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  return getImagePath(category, id || "placeholder");
}
