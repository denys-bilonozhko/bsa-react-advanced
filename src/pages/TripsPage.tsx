import { useState } from 'react'
import { TripCard } from '../components/TripCard'
import type { Trip, TripLevel } from '../types/travel'

type TripsPageProps = {
  trips: Trip[]
}

type DurationFilter = '' | '0_x_5' | '5_x_10' | '10'
type LevelFilter = '' | TripLevel

const durationMatches = (duration: number, filter: DurationFilter) => {
  if (filter === '0_x_5') return duration >= 1 && duration <= 5
  if (filter === '5_x_10') return duration >= 6 && duration <= 10
  if (filter === '10') return duration >= 11
  return true
}

export function TripsPage({ trips }: TripsPageProps) {
  const [search, setSearch] = useState('')
  const [duration, setDuration] = useState<DurationFilter>('')
  const [level, setLevel] = useState<LevelFilter>('')

  const visibleTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().search(search.toLowerCase()) !== -1 &&
      durationMatches(trip.duration, duration) &&
      (!level || trip.level === level),
  )

  return (
    <main>
      <h1 className="visually-hidden">Travel App</h1>
      <section className="trips-filter">
        <h2 className="visually-hidden">Trips filter</h2>
        <form className="trips-filter__form" autoComplete="off">
          <label className="trips-filter__search input">
            <span className="visually-hidden">Search by name</span>
            <input
              data-test-id="filter-search"
              name="search"
              type="search"
              placeholder="search by title"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label className="select">
            <span className="visually-hidden">Search by duration</span>
            <select
              data-test-id="filter-duration"
              name="duration"
              value={duration}
              onChange={(event) =>
                setDuration(event.target.value as DurationFilter)
              }
            >
              <option value="">duration</option>
              <option value="0_x_5">1–5 days</option>
              <option value="5_x_10">6–10 days</option>
              <option value="10">11+ days</option>
            </select>
          </label>
          <label className="select">
            <span className="visually-hidden">Search by level</span>
            <select
              data-test-id="filter-level"
              name="level"
              value={level}
              onChange={(event) =>
                setLevel(event.target.value as LevelFilter)
              }
            >
              <option value="">level</option>
              <option value="easy">easy</option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
            </select>
          </label>
        </form>
      </section>
      <section className="trips">
        <h2 className="visually-hidden">Trips List</h2>
        <ul className="trip-list">
          {visibleTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </ul>
      </section>
    </main>
  )
}
