import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'

// FIXME: change data-theme depending on selection in settings
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)

document.documentElement.setAttribute('data-theme', 'classic');