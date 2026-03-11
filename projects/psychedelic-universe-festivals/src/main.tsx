import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// index.css removed — using styles/globals.css via App.tsx
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
