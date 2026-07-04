import { useEffect } from 'react'
import { BookingCard } from '../components/BookingCard'
import { Loader } from '../components/Loader'
import {
  cancelBooking,
  loadBookings,
} from '../store/bookingsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import './BookingsPage.css'

export function BookingsPage() {
  const dispatch = useAppDispatch()
  const { items: bookings, loadStatus, isMutating } = useAppSelector(
    (state) => state.bookings,
  )

  useEffect(() => {
    if (loadStatus === 'idle') {
      void dispatch(loadBookings())
    }
  }, [dispatch, loadStatus])

  const sortedBookings = [...bookings].sort(
    (first, second) =>
      new Date(first.date).getTime() - new Date(second.date).getTime(),
  )

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      {loadStatus === 'loading' || isMutating ? (
        <Loader />
      ) : (
        <ul className="bookings__list">
          {sortedBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={(bookingId) => void dispatch(cancelBooking(bookingId))}
            />
          ))}
        </ul>
      )}
    </main>
  )
}
