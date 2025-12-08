import React from "react";
import { Routes, Route } from "react-router-dom";
import Application from "../Application.jsx";
import Authentication from "./Authentication";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Application />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Authentication />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
