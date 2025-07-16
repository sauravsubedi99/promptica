import axios from "axios";

// Base axios instance
const API = axios.create({
  baseURL: "https://ccb1914a2f18.ngrok-free.app/",
});

// Automatically attach token unless it's a public endpoint
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const publicEndpoints = ["/users/signin/", "/users/signup/"];
    const isPublic = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

    if (token && !isPublic) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ---------- Auth ----------
export const signup = (data) => API.post("/users/signup/", data);
export const signin = (data) => API.post("/users/signin/", data);
export const getCurrentUser = () => API.get("/users/current-user/");
export const requestPasswordReset = (data) => API.post("/users/request-reset/", data);

// ---------- Conversations ----------
export const fetchConversations = () => API.get("/conversations/user/");
export const createConversation = (label) => API.post("/conversations/user/", { label });
export const updateConversation = (id, label) =>
  API.patch("/conversations/user/", { conversation_id: id, label });
export const deleteConversation = (id) =>
  API.delete("/conversations/user/", { data: { conversation_id: id } });

// ---------- Messages ----------
export const fetchMessages = (conversationId) =>
  API.get(`/conversations/message/?conversation_id=${conversationId}`);
export const sendPrompt = (conversationId, prompt) =>
  API.post("/conversations/message/", { conversation_id: conversationId, prompt });

export default API;
