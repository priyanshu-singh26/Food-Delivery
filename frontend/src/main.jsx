// import { StrictMode } from 'react'
import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import StoreContextprovider from './context/StoreContext.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextprovider>
       <App />
    </StoreContextprovider>
  </BrowserRouter>
)
