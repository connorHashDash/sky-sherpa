import Home from './pages/Home/Home.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import SignIn from "./pages/SignIn/SignIn.tsx"
import { createRoot } from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createContext, useState } from 'react'
import SearchResults from './pages/SearchResults/SearchResults.tsx'

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
    },
    {
      path: '/search',
      element: <SearchResults />,
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
