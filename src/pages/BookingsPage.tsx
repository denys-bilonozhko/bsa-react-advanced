import { BookingCard } from '../components/BookingCard'
import type { Booking } from '../types/travel'
import './BookingsPage.css'

type BookingsPageProps = {
  bookings: Booking[]
  onCancel: (bookingId: string) => void
}

export function BookingsPage({ bookings, onCancel }: BookingsPageProps) {
  const sortedBookings = [...bookings].sort(
    (first, second) =>
      new Date(first.date).getTime() - new Date(second.date).getTime(),
  )

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {sortedBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onCancel={onCancel}
          />
        ))}
      </ul>
    </main>
  )
}
