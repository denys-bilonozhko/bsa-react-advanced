import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AuthPage.css'

type AuthPageProps = {
  mode: 'sign-in' | 'sign-up'
}

export function AuthPage({ mode }: AuthPageProps) {
  const navigate = useNavigate()
  const isSignUp = mode === 'sign-up'
  const actionLabel = isSignUp ? 'Sign Up' : 'Sign In'
  const alternativeLabel = isSignUp ? 'Sign In' : 'Sign Up'
  const alternativePath = isSignUp ? '/sign-in' : '/sign-up'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <main className={`${mode}-page`}>
      <h1 className="visually-hidden">Travel App</h1>
      <form
        className={`${mode}-form`}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className={`${mode}-form__title`}>{actionLabel}</h2>
        {isSignUp && (
          <label className="input">
            <span className="input__heading">Full name</span>
            <input
              data-test-id="auth-full-name"
              name="full-name"
              type="text"
              required
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
          />
        </label>
        <button data-test-id="auth-submit" className="button" type="submit">
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
