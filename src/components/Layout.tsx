import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import type { User } from '../store/authSlice'

type LayoutProps = {
  user: User | null
}

export function Layout({ user }: LayoutProps) {
  return (
    <>
      <Header user={user} />
      <Outlet />
      <Footer />
    </>
  )
}
