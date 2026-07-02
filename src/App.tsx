import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import bookingsData from './assets/data/bookings.json'
import { Layout } from './components/Layout'
import { AuthPage } from './pages/AuthPage'
import { PagePlaceholder } from './pages/PagePlaceholder'
import type { Booking } from './types/travel'

function App() {
  const [bookings] = useState<Booking[]>(bookingsData)

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PagePlaceholder title="Trips" />} />
        <Route path="/sign-up" element={<AuthPage mode="sign-up" />} />
        <Route path="/sign-in" element={<AuthPage mode="sign-in" />} />
        <Route
          path="/trip/:tripId"
          element={<PagePlaceholder title="Trip details" />}
        />
        <Route
          path="/bookings"
          element={<PagePlaceholder title={`Bookings (${bookings.length})`} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
