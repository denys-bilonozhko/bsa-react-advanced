import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiRequest, TOKEN_KEY, toApiError, type ApiError } from './api'

export type User = {
  id: string
  fullName: string
  email: string
  createdAt: string
}

type AuthResponse = {
  token: string
  user: User
}

type SignInPayload = {
  email: string
  password: string
}

type SignUpPayload = SignInPayload & {
  fullName: string
}

type AuthState = {
  user: User | null
  isSessionChecked: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isSessionChecked: false,
  isLoading: false,
}

export const loadCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: ApiError }
>('auth/loadCurrentUser', async (_, { rejectWithValue }) => {
  try {
    return await apiRequest<User>('/auth/authenticated-user')
  } catch (error) {
    return rejectWithValue(toApiError(error))
  }
})

export const signIn = createAsyncThunk<
  AuthResponse,
  SignInPayload,
  { rejectValue: ApiError }
>('auth/signIn', async (payload, { rejectWithValue }) => {
  try {
    return await apiRequest<AuthResponse>('/auth/sign-in', {
      authenticated: false,
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    return rejectWithValue(toApiError(error))
  }
})

export const signUp = createAsyncThunk<
  AuthResponse,
  SignUpPayload,
  { rejectValue: ApiError }
>('auth/signUp', async (payload, { rejectWithValue }) => {
  try {
    return await apiRequest<AuthResponse>('/auth/sign-up', {
      authenticated: false,
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    return rejectWithValue(toApiError(error))
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    sessionChecked(state) {
      state.isSessionChecked = true
    },
    signedOut(state) {
      state.user = null
      state.isSessionChecked = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.isSessionChecked = true
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.user = null
        state.isLoading = false
        state.isSessionChecked = true
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false
        state.isSessionChecked = true
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false
        state.isSessionChecked = true
      })
      .addCase(signUp.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { sessionChecked, signedOut } = authSlice.actions
export const authReducer = authSlice.reducer

export const hasStoredToken = () => Boolean(localStorage.getItem(TOKEN_KEY))
