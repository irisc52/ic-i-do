import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './Router.jsx'
import About from './About.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />  
  </StrictMode>,
)