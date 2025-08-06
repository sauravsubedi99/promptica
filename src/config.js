// src/config.js
export const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://server.promptica.chat/"
    : "http://localhost:8000";

export const IMAGE_BASE_URL = `${API_BASE_URL}`;

export const getUserImageUrl = (image) => {
  if (!image) return null;
  return image.startsWith("http") ? image : `${IMAGE_BASE_URL}${image}`;
};