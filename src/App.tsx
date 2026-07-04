import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Loader } from './components/Loader'
import { AuthPage } from './pages/AuthPage'
import { BookingsPage } from './pages/BookingsPage'
import { TripPage } from './pages/TripPage'
import { TripsPage } from './pages/TripsPage'
import {
  hasStoredToken,
  loadCurrentUser,
  sessionChecked,
} from './store/authSlice'
import { useAppDispatch, useAppSelector } from './store/hooks'

function App() {
  const dispatch = useAppDispatch()
  const { user, isSessionChecked } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (hasStoredToken()) {
      void dispatch(loadCurrentUser())
    } else {
      dispatch(sessionChecked())
    }
  }, [dispatch])

  if (!isSessionChecked) {
    return (
      <div className="loader-page">
        <Loader />
      </div>
    )
  }

  return (
    <Routes>
      <Route element={<Layout user={user} />}>
        <Route
          path="/sign-up"
          element={user ? <Navigate to="/" replace /> : <AuthPage mode="sign-up" />}
        />
        <Route
          path="/sign-in"
          element={user ? <Navigate to="/" replace /> : <AuthPage mode="sign-in" />}
        />
        {user && (
          <>
            <Route path="/" element={<TripsPage />} />
            <Route path="/trip/:tripId" element={<TripPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={user ? '/' : '/sign-in'} replace />}
        />
      </Route>
    </Routes>
  )
}

export default App
