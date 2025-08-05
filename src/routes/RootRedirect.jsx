// RootRedirect.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "../pages/landing/Landing.jsx";

const RootRedirect = () => {
  const navigate = useNavigate();
  const hasRedirectedRef = useRef(false);

  //Lock this value ONCE before useEffect
  const isFirstVisit = useRef(
    localStorage.getItem("hasVisited") !== "true"
  );

  useEffect(() => {
    if (hasRedirectedRef.current) return;
    hasRedirectedRef.current = true;

    const user = localStorage.getItem("user");
    // console.log("useEffect running...");
    // console.log("isFirstVisit =", isFirstVisit.current);
    // console.log("user =", user);

    if (isFirstVisit.current) {
      // Set only once — after locking
      localStorage.setItem("hasVisited", "true");
      // console.log("First visit — showing Landing");
      return;
    }

    if (user) {
      // console.log("Returning user — redirecting to /chat");
      navigate("/chat");
    } else {
      // console.log("Logged-out user — redirecting to /login");
      navigate("/login");
    }
  }, [navigate]);

  // If first visit, show Landing at "/"
  if (isFirstVisit.current) {
    return <Landing />;
  }

  // Otherwise, wait for redirect
  return <div>Loading...</div>;
};

export default RootRedirect;
