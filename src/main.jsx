import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Calculator from './components/Calculator.jsx'
import Database from "./Database.jsx"
import LoginPage from "./LoginPage.jsx"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <MusicPlayer/> */}
  </React.StrictMode>,
)
