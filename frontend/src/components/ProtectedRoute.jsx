import React, { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlobalLoader from "./GlobalLoader";

const ProtectedRoute = React.memo(({ children }) => {
  const [auth, setAuth] = useState("loading"); 
  // "loading", "authorized", "unauthorized"

  const verifyUser = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_RENDER_URL}/auth/me`, {
        method: "GET",
        credentials: "include", // sends cookie/session
      });

      // If backend returns 401 or any failure
      if (!res.ok) {
        setAuth("unauthorized");
        return;
      }

      setAuth("authorized");
    } catch (error) {
      setAuth("unauthorized");

      // toast moved here but wrapped to avoid repeated firing
      toast.error("Network Error - Please login again");
    }
  }, []);

  useEffect(() => {
    verifyUser(); // only runs once
  }, [verifyUser]);

  //  Cleaner fallback UI (doesn't break layout)
  if (auth === "loading") {
    return (
      <GlobalLoader/>
    );
  }

  return auth === "authorized" ? children : <Navigate to="/auth" replace />;
});

export default ProtectedRoute;
