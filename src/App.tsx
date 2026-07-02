import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import bookingsData from './assets/data/bookings.json'
import { Layout } from './components/Layout'
import { AuthPage } from './pages/AuthPage'
import { BookingsPage } from './pages/BookingsPage'
import { TripPage } from './pages/TripPage'
import { TripsPage } from './pages/TripsPage'
import type { Booking } from './types/travel'

function App() {
  const [bookings, setBookings] = useState<Booking[]>(bookingsData)

  const addBooking = (booking: Booking) => {
    setBookings((currentBookings) => [...currentBookings, booking])
  }

  const cancelBooking = (bookingId: string) => {
    setBookings((currentBookings) =>
      currentBookings.filter(({ id }) => id !== bookingId),
    )
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TripsPage />} />
        <Route path="/sign-up" element={<AuthPage mode="sign-up" />} />
        <Route path="/sign-in" element={<AuthPage mode="sign-in" />} />
        <Route
          path="/trip/:tripId"
          element={<TripPage onBook={addBooking} />}
        />
        <Route
          path="/bookings"
          element={
            <BookingsPage bookings={bookings} onCancel={cancelBooking} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
