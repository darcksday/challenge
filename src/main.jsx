import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Bootstrap Bundle JS
import { SignInProvider } from "./context/Web3Context";
import { RequestProvider } from './context/RequestContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SignInProvider>
    <RequestProvider>
      <App />
    </RequestProvider>
  </SignInProvider>
)
