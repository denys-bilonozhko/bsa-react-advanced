import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { BookTripModal } from '../components/BookTripModal'
import { Loader } from '../components/Loader'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearCurrentTrip, loadTrip } from '../store/tripsSlice'
import './TripPage.css'

export function TripPage() {
  const dispatch = useAppDispatch()
  const { tripId } = useParams()
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { current: trip, currentStatus } = useAppSelector(
    (state) => state.trips,
  )

  useEffect(() => {
    if (tripId) {
      void dispatch(loadTrip(tripId))
    }

    return () => {
      dispatch(clearCurrentTrip())
    }
  }, [dispatch, tripId])

  if (currentStatus === 'loading' || currentStatus === 'idle') {
    return (
      <main className="loader-page">
        <Loader />
      </main>
    )
  }

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
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </>
  )
}
