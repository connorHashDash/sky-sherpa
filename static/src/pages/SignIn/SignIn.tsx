import NavBar from "../../components/NavBar/NavBar.tsx"
import "./SignIn.scss"
import SignInForm from "./components/SignInForm.tsx"
import { useState } from 'react'
import { useNavigate } from "react-router"


export default function SignIn() {

  const navigate = useNavigate()

  const [showSignIn, setShowSignIn] = useState<boolean>(true)
  const [error, setError] = useState<string>()

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)


    try {
      const resp = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        body: formData
      })
      if (resp.ok) {
        navigate("/works")
      } else if (resp.status == 406) {
        setError("Error signing in, check password or email")
      }
    }
    catch {
      setError("error lol")
    }
  }

  const handleSiginSignUp = () => {
    setShowSignIn(!showSignIn)
  }

  return (
    <div id="sign_in">
      <NavBar isSignin={true} />
      <div id="form_holder">
        <div id="signin_form">
          <h3 id="sign_in_or_up">
            <span onClick={handleSiginSignUp} id={`sign_in_button`} className={showSignIn ? "active" : ''}>
              Sign in
            </span>/ <br /> <span
              onClick={handleSiginSignUp}
              id="sign_up_button"
              className={!showSignIn ? "active" : ''}>
              Sign up
            </span>
          </h3>
          <SignInForm login={login} />
          {error && (
            <div id="error">
              {error}
            </div>
          )
          }

        </div>
      </div>

    </div>
  )
}
