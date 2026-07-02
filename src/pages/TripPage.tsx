import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { BookTripModal } from '../components/BookTripModal'
import type { Booking, Trip } from '../types/travel'
import './TripPage.css'

type TripPageProps = {
  trips: Trip[]
  onBook: (booking: Booking) => void
}

export function TripPage({ trips, onBook }: TripPageProps) {
  const { tripId } = useParams()
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const trip = trips.find(({ id }) => id === tripId)

  if (!trip) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <main className="trip-page">
        <h1 className="visually-hidden">Travel App</h1>
        <div className="trip">
          <img
            data-test-id="trip-details-image"
            src={trip.image}
            className="trip__img"
            alt={trip.title}
          />
          <div className="trip__content">
            <div className="trip-info">
              <h3
                data-test-id="trip-details-title"
                className="trip-info__title"
              >
                {trip.title}
              </h3>
              <div className="trip-info__content">
                <span
                  data-test-id="trip-details-duration"
                  className="trip-info__duration"
                >
                  <strong>{trip.duration}</strong> days
                </span>
                <span
                  data-test-id="trip-details-level"
                  className="trip-info__level"
                >
                  {trip.level}
                </span>
              </div>
            </div>
            <div
              data-test-id="trip-details-description"
              className="trip__description"
            >
              {trip.description}
            </div>
            <div className="trip-price">
              <span>Price</span>
              <strong
                data-test-id="trip-details-price-value"
                className="trip-price__value"
              >
                ${trip.price}
              </strong>
            </div>
            <button
              data-test-id="trip-details-button"
              className="trip__button button"
              type="button"
              onClick={() => setIsBookingOpen(true)}
            >
              Book a trip
            </button>
          </div>
        </div>
      </main>
      {isBookingOpen && (
        <BookTripModal
          trip={trip}
          onBook={onBook}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </>
  )
}
