// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Components
import { App } from '@/App'

// Styles
import '@/assets/styles/index.scss'

// We get the element into which our application will be inflated.
const root = ReactDOM.createRoot(document.getElementById('root'))

// Rendering our application.
root.render(<App />)
