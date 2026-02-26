import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-dom/client' // Opsional jika ingin pakai provider terpisah
import { RouterProvider as RouterProviderDom } from "react-router-dom";
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProviderDom router={router} />
  </React.StrictMode>,
)