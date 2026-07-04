import { useState, type FormEvent } from 'react'
import { createBooking } from '../store/bookingsSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { Trip } from '../types/travel'
import { Loader } from './Loader'
import './BookTripModal.css'

type BookTripModalProps = {
  trip: Trip
  onClose: () => void
}

const formatDateInput = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getTomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return formatDateInput(tomorrow)
}

export function BookTripModal({
  trip,
  onClose,
}: BookTripModalProps) {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.bookings.isMutating)
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(1)
  const totalPrice = trip.price * guests

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await dispatch(
      createBooking({
        tripId: trip.id,
        guests,
        date,
      }),
    )

    if (createBooking.fulfilled.match(result)) {
      onClose()
    }
  }

  return (
    <div className="modal">
      <div data-test-id="book-trip-popup" className="book-trip-popup">
        <button
          data-test-id="book-trip-popup-close"
          className="book-trip-popup__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        <form
          className="book-trip-popup__form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {isLoading && <Loader />}
          <div className="trip-info">
            <h3
              data-test-id="book-trip-popup-title"
              className="trip-info__title"
            >
              {trip.title}
            </h3>
            <div className="trip-info__content">
              <span
                data-test-id="book-trip-popup-duration"
                className="trip-info__duration"
              >
                <strong>{trip.duration}</strong> days
              </span>
              <span
                data-test-id="book-trip-popup-level"
                className="trip-info__level"
              >
                {trip.level}
              </span>
            </div>
          </div>
          <label className="input">
            <span className="input__heading">Date</span>
            <input
              data-test-id="book-trip-popup-date"
              name="date"
              type="date"
              min={getTomorrow()}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>
          <label className="input">
            <span className="input__heading">Number of guests</span>
            <input
              data-test-id="book-trip-popup-guests"
              name="guests"
              type="number"
              min={1}
              max={10}
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
              required
            />
          </label>
          <span className="book-trip-popup__total">
            Total:
            <output
              data-test-id="book-trip-popup-total-value"
              className="book-trip-popup__total-value"
            >
              ${totalPrice}
            </output>
          </span>
          <button
            data-test-id="book-trip-popup-submit"
            className="button"
            type="submit"
            disabled={!date || guests < 1 || guests > 10 || isLoading}
          >
            Book a trip
          </button>
        </form>
      </div>
    </div>
  )
}
