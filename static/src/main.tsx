import Home from './pages/Home/Home.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import SignIn from "./pages/SignIn/SignIn.tsx"
import { createRoot } from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router'

function Main() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: '/signin',
      element: <SignIn />,
      errorElement: <ErrorPage />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

createRoot(document.getElementById('root')!).render(<Main />)
