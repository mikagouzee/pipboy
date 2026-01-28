import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PipBoyProvider } from './context/PipBoyContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PipBoyProvider>
      <App />
    </PipBoyProvider>
  </StrictMode>,
)
