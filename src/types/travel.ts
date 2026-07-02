export type TripLevel = 'easy' | 'moderate' | 'difficult'

export type Trip = {
  id: string
  title: string
  description: string
  level: TripLevel
  duration: number
  price: number
  image: string
  createdAt: string
}

export type BookingTrip = Pick<Trip, 'title' | 'duration' | 'price'>

export type Booking = {
  id: string
  userId: string
  tripId: string
  guests: number
  date: string
  trip: BookingTrip
  totalPrice: number
  createdAt: string
}
