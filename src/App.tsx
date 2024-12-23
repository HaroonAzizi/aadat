// src/App.tsx

import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AppRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App