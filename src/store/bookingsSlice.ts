import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Booking } from '../types/travel'
import { apiRequest, toApiError, type ApiError } from './api'

type CreateBookingPayload = {
  tripId: string
  guests: number
  date: string
}

type BookingsState = {
  items: Booking[]
  loadStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  isMutating: boolean
}

const initialState: BookingsState = {
  items: [],
  loadStatus: 'idle',
  isMutating: false,
}

export const loadBookings = createAsyncThunk<
  Booking[],
  void,
  { rejectValue: ApiError }
>('bookings/loadAll', async (_, { rejectWithValue }) => {
  try {
    return await apiRequest<Booking[]>('/bookings')
  } catch (error) {
    return rejectWithValue(toApiError(error))
  }
})

export const createBooking = createAsyncThunk<
  Booking,
  CreateBookingPayload,
  { rejectValue: ApiError }
>('bookings/create', async (payload, { rejectWithValue }) => {
  try {
    return await apiRequest<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    return rejectWithValue(toApiError(error))
  }
})

export const cancelBooking = createAsyncThunk<
  string,
  string,
  { rejectValue: ApiError }
>('bookings/cancel', async (bookingId, { rejectWithValue }) => {
  try {
    await apiRequest<void>(`/bookings/${bookingId}`, { method: 'DELETE' })
    return bookingId
  } catch (error) {
    return rejectWithValue(toApiError(error))
  }
})

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBookings.pending, (state) => {
        state.loadStatus = 'loading'
      })
      .addCase(loadBookings.fulfilled, (state, action) => {
        state.items = action.payload
        state.loadStatus = 'succeeded'
      })
      .addCase(loadBookings.rejected, (state) => {
        state.loadStatus = 'failed'
      })
      .addCase(createBooking.pending, (state) => {
        state.isMutating = true
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.isMutating = false
      })
      .addCase(createBooking.rejected, (state) => {
        state.isMutating = false
      })
      .addCase(cancelBooking.pending, (state) => {
        state.isMutating = true
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.items = state.items.filter(({ id }) => id !== action.payload)
        state.isMutating = false
      })
      .addCase(cancelBooking.rejected, (state) => {
        state.isMutating = false
      })
  },
})

export const bookingsReducer = bookingsSlice.reducer
