import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import App from './components/App.jsx'
import { LoaderProvider } from './components/LoaderContext.jsx';
import GlobalLoader from "./components/GlobalLoader.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <LoaderProvider>
          <GlobalLoader />
          <App />
        </LoaderProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
