import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { GoogleOAuthProvider } from "@react-oauth/google";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='831714260891-79tithigtf8aqk1cdmruttebduookb8v.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
