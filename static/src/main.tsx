import Home from './pages/Home/Home.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import SignIn from "./pages/SignIn/SignIn.tsx"
import { createRoot } from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { createContext, useState } from 'react'

export const UserStatus = createContext<boolean | null>(null)

function Main() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: '/signin',
      element: <SignIn setLoggedIn={setLoggedIn} />,
      errorElement: <ErrorPage />
    }
  ])

  return (
    <UserStatus.Provider value={loggedIn}>
      <RouterProvider router={router} />
    </UserStatus.Provider>
  )
}

createRoot(document.getElementById('root')!).render(<Main />)
