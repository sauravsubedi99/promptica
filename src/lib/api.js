import axios from "axios";
import { API_BASE_URL } from "../config";

// Base axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically attach token unless it's a public endpoint
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const publicEndpoints = ["/users/signin/", "/users/signup/"];
    const isPublic = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (token && !isPublic) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ========== AUTH ENDPOINTS ==========

export const signup = (data) => API.post("/users/signup/", data);

export const signin = (data) => API.post("/users/signin/", data);

export const getCurrentUser = () => API.get("/users/current-user/");

export const requestPasswordReset = (data) =>
  API.post("/users/request-reset/", data);

// ========== CONVERSATIONS ==========

export const fetchConversations = () => API.get("/conversations/user/");

export const createConversation = (label) =>
  API.post("/conversations/user/", { label });

export const updateConversation = (id, label) =>
  API.patch("/conversations/user/", { conversation_id: id, label });

export const deleteConversation = (id) =>
  API.delete("/conversations/user/", { data: { conversation_id: id } });

// ========== MESSAGES ==========

export const fetchMessages = (conversationId) =>
  API.get(`/conversations/message/?conversation_id=${conversationId}`);

export const sendPrompt = (conversationId, prompt) =>
  API.post("/conversations/message/", {
    conversation_id: conversationId,
    prompt,
  });

// ========== FEEDBACK ==========
export const sendFeedback = (message_id, feedback) =>
  API.patch("/conversations/message/", {
    message_id: message_id,
    feedback: feedback,
  });

//========== FORGOT PASSWORD ==========
// Request password reset link
export const resetPasswordRequest = (data) =>
  API.post("users/password-reset/", data);

// Confirm password reset
export const resetPasswordConfirm = (data) =>
  API.post("/users/password-reset-confirm/", {
    uid: data.uid,
    token: data.token,
    password: data.new_password,
  });

// ========== USER SETTINGS ==========
// Update user password
// Update user password
export const updateUserPassword = (data) => API.put("/users/update/", data);

//User image upload
export const updateUserPhoto = (file) => {
  const formData = new FormData();
  formData.append("image", file); // "photo" must match the backend field name

  return API.put("/users/update/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export default API;
