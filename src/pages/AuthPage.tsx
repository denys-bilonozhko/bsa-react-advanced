import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { signIn, signUp } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import './AuthPage.css'

type AuthPageProps = {
  mode: 'sign-in' | 'sign-up'
}

export function AuthPage({ mode }: AuthPageProps) {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const isSignUp = mode === 'sign-up'
  const actionLabel = isSignUp ? 'Sign Up' : 'Sign In'
  const alternativeLabel = isSignUp ? 'Sign In' : 'Sign Up'
  const alternativePath = isSignUp ? '/sign-in' : '/sign-up'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSignUp) {
      void dispatch(signUp({ fullName, email, password }))
    } else {
      void dispatch(signIn({ email, password }))
    }
  }

  return (
    <main className={`${mode}-page`}>
      <h1 className="visually-hidden">Travel App</h1>
      <form
        className={`${mode}-form`}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {isLoading && <Loader />}
        <h2 className={`${mode}-form__title`}>{actionLabel}</h2>
        {isSignUp && (
          <label className="input">
            <span className="input__heading">Full name</span>
            <input
              data-test-id="auth-full-name"
              name="full-name"
              type="text"
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </label>
        )}
        <label className="input">
          <span className="input__heading">Email</span>
          <input
            data-test-id="auth-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="input">
          <span className="input__heading">Password</span>
          <input
            data-test-id="auth-password"
            name="password"
            type="password"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            minLength={3}
            maxLength={20}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button
          data-test-id="auth-submit"
          className="button"
          type="submit"
          disabled={
            isLoading ||
            !email ||
            password.length < 3 ||
            password.length > 20 ||
            (isSignUp && !fullName)
          }
        >
          {actionLabel}
        </button>
      </form>
      <span>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link
          data-test-id={`auth-${alternativePath.slice(1)}-link`}
          to={alternativePath}
          className={`${mode}-form__link`}
        >
          {alternativeLabel}
        </Link>
      </span>
    </main>
  )
}
