import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import './index.css'
import "react-toastify/dist/ReactToastify.css";
import App from './components/App.jsx'

//date - 08/11/2025 - we are ready to deploy
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </StrictMode>,
)
