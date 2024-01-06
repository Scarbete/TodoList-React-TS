import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './assets/styles/core.sass'

const root = document.getElementById('root')!

createRoot(root).render(
    <App />
)
