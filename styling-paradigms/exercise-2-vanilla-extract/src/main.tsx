import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { themeClass } from './styles/theme.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className={themeClass}>
      <App />
    </div>
  </React.StrictMode>,
)