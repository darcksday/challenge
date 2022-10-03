import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/index.css'
// // Bootstrap Bundle JS
import { Web3Provider } from "./context/Web3Context";
import { RequestProvider } from './context/RequestContext';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './theme';
import '@rainbow-me/rainbowkit/styles.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Web3Provider>
    <BrowserRouter>
      <RequestProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </RequestProvider>
    </BrowserRouter>
  </Web3Provider>
)
