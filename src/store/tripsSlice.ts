import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Trip } from '../types/travel'
import { apiRequest, toApiError, type ApiError } from './api'

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type TripsState = {
  items: Trip[]
  current: Trip | null
  listStatus: RequestStatus
  currentStatus: RequestStatus
}

const initialState: TripsState = {
  items: [],
  current: null,
  listStatus: 'idle',
  currentStatus: 'idle',
}

export const loadTrips = createAsyncThunk<
  Trip[],
  void,
  { rejectValue: ApiError }
>('trips/loadAll', async (_, { rejectWithValue }) => {
  try {
    return await apiRequest<Trip[]>('/trips')
  } catch (error) {
    return rejectWithValue(toApiError(error))
  }
})

export const loadTrip = createAsyncThunk<
  Trip,
  string,
  { rejectValue: ApiError }
>('trips/loadOne', async (tripId, { rejectWithValue }) => {
  try {
    return await apiRequest<Trip>(`/trips/${tripId}`)
  } catch (error) {
    return rejectWithValue(toApiError(error))
  }
})

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    clearCurrentTrip(state) {
      state.current = null
      state.currentStatus = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTrips.pending, (state) => {
        state.listStatus = 'loading'
      })
      .addCase(loadTrips.fulfilled, (state, action) => {
        state.items = action.payload
        state.listStatus = 'succeeded'
      })
      .addCase(loadTrips.rejected, (state) => {
        state.listStatus = 'failed'
      })
      .addCase(loadTrip.pending, (state) => {
        state.current = null
        state.currentStatus = 'loading'
      })
      .addCase(loadTrip.fulfilled, (state, action) => {
        state.current = action.payload
        state.currentStatus = 'succeeded'
      })
      .addCase(loadTrip.rejected, (state) => {
        state.currentStatus = 'failed'
      })
  },
})

export const { clearCurrentTrip } = tripsSlice.actions
export const tripsReducer = tripsSlice.reducer
