import { Link, useLocation } from 'react-router-dom'
import briefcaseIcon from '../assets/images/briefcase.svg'
import userIcon from '../assets/images/user.svg'
import './Header.css'

const authPaths = new Set(['/sign-in', '/sign-up'])

export function Header() {
  const { pathname } = useLocation()
  const showNavigation = !authPaths.has(pathname)

  return (
    <header className="header">
      <div className="header__inner">
        <Link data-test-id="header-logo" to="/" className="header__logo">
          Travel App
        </Link>
        {showNavigation && (
          <nav data-test-id="header-nav" className="header__nav">
            <ul className="nav-header__list">
              <li className="nav-header__item" title="Bookings">
                <Link
                  data-test-id="header-bookings-link"
                  to="/bookings"
                  className="nav-header__inner"
                >
                  <span className="visually-hidden">Bookings</span>
                  <img src={briefcaseIcon} alt="bookings" />
                </Link>
              </li>
              <li className="nav-header__item" title="Profile">
                <div
                  data-test-id="header-profile-nav"
                  className="nav-header__inner profile-nav"
                  tabIndex={0}
                >
                  <span className="visually-hidden">Profile</span>
                  <img src={userIcon} alt="profile" />
                  <ul
                    data-test-id="header-profile-nav-list"
                    className="profile-nav__list"
                  >
                    <li
                      data-test-id="header-profile-nav-username"
                      className="profile-nav__item"
                    >
                      John Doe
                    </li>
                    <li className="profile-nav__item">
                      <Link
                        data-test-id="header-profile-nav-sign-out"
                        to="/sign-in"
                        className="profile-nav__sign-out button"
                      >
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
