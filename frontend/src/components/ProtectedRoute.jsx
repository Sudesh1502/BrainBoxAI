import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // null = loading, true/false = final state

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_RENDER_URL}/auth/me`, {
          method: "GET",
          credentials: "include"
        });

        if (!res.ok) return setAuth(false);

        setAuth(true);
      } catch (err) {
        setAuth(false);
        toast.error(err.message);
      }
    };

    verifyUser();
  }, []);

  if (auth === null) return <p>Loading...</p>;

  return auth ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
