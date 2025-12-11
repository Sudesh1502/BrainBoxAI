// App.jsx

import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Authentication from "./Authentication";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute.jsx";
import GlobalLoader from "./GlobalLoader.jsx";

// Lazy-load heavy dashboard component
const Application = lazy(() => import("../Application.jsx"));

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            // memoized ProtectedRoute avoids re-renders
            <ProtectedRoute>
              {/*Suspense ensures chunk loading is smooth */}
              <Suspense fallback={<GlobalLoader/>}>
                <Application />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route path="/auth" element={<Authentication />} />
      </Routes>

      {/* limit prevents toast spam + improves rendering */}
      <ToastContainer limit={1} />
    </>
  );
};

export default App;
