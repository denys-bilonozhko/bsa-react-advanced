import {
  configureStore,
  createListenerMiddleware,
  isRejectedWithValue,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  authReducer,
  loadCurrentUser,
  signIn,
  signUp,
  signedOut,
} from './authSlice'
import { TOKEN_KEY, type ApiError } from './api'
import {
  bookingsReducer,
  cancelBooking,
  createBooking,
} from './bookingsSlice'
import { tripsReducer } from './tripsSlice'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: isRejectedWithValue,
  effect: (action, api) => {
    const error = action.payload as ApiError

    if (error.status === 401 || loadCurrentUser.rejected.match(action)) {
      api.dispatch(signedOut())
    }

    toast.error(error.message, { className: 'notification' })
  },
})

listenerMiddleware.startListening({
  matcher: (action) =>
    signIn.fulfilled.match(action) || signUp.fulfilled.match(action),
  effect: (action) => {
    localStorage.setItem(TOKEN_KEY, action.payload.token)
  },
})

listenerMiddleware.startListening({
  actionCreator: signedOut,
  effect: () => {
    localStorage.removeItem(TOKEN_KEY)
  },
})

listenerMiddleware.startListening({
  matcher: (action) =>
    createBooking.fulfilled.match(action) ||
    cancelBooking.fulfilled.match(action),
  effect: (action) => {
    toast.success(
      createBooking.fulfilled.match(action)
        ? 'The trip has been booked successfully'
        : 'The booking has been cancelled successfully',
      { className: 'notification' },
    )
  },
})

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookings: bookingsReducer,
    trips: tripsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
