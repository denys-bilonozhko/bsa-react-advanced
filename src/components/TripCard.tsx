import { Link } from 'react-router-dom'
import type { Trip } from '../types/travel'

type TripCardProps = {
  trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <li data-test-id="trip-card" className="trip-card">
      <img
        data-test-id="trip-card-image"
        src={trip.image}
        alt={trip.title}
      />
      <div className="trip-card__content">
        <div className="trip-info">
          <h3 data-test-id="trip-card-title" className="trip-info__title">
            {trip.title}
          </h3>
          <div className="trip-info__content">
            <span
              data-test-id="trip-card-duration"
              className="trip-info__duration"
            >
              <strong>{trip.duration}</strong> days
            </span>
            <span data-test-id="trip-card-level" className="trip-info__level">
              {trip.level}
            </span>
          </div>
        </div>
        <div className="trip-price">
          <span>Price</span>
          <strong
            data-test-id="trip-card-price-value"
            className="trip-price__value"
          >
            ${trip.price}
          </strong>
        </div>
      </div>
      <Link
        data-test-id="trip-card-link"
        to={`/trip/${trip.id}`}
        className="button"
      >
        Discover a trip
      </Link>
    </li>
  )
}
