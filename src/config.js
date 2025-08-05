// src/config.js
export const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://promtica.applikuapp.com/"
    : "http://localhost:8000";

export const IMAGE_BASE_URL = `${API_BASE_URL}`;