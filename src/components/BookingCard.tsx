import type { Booking } from '../types/travel'

type BookingCardProps = {
  booking: Booking
  onCancel: (bookingId: string) => void
}

export function BookingCard({ booking, onCancel }: BookingCardProps) {
  return (
    <li data-test-id="booking" className="booking">
      <h3 data-test-id="booking-title" className="booking__title">
        {booking.trip.title}
      </h3>
      <span data-test-id="booking-guests" className="booking__guests">
        {booking.guests} guests
      </span>
      <span data-test-id="booking-date" className="booking__date">
        {booking.date.slice(0, 10)}
      </span>
      <span data-test-id="booking-total" className="booking__total">
        ${booking.totalPrice}
      </span>
      <button
        data-test-id="booking-cancel"
        className="booking__cancel"
        type="button"
        title="Cancel booking"
        onClick={() => onCancel(booking.id)}
      >
        <span className="visually-hidden">Cancel booking</span>×
      </button>
    </li>
  )
}
