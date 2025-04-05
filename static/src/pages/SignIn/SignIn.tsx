import NavBar from "../../components/NavBar/NavBar.tsx"
import "./SignIn.scss"
import SignInForm from "./components/SignInForm.tsx"
import { useState } from 'react'
import { useNavigate } from "react-router"
import SignUpForm from "./components/SignUpForm.tsx"


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

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    try {
      const resp = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        body: formData
      })
      if (resp.ok) {
        setError(undefined)
      } else {
        const errorText: string = await resp.text()
        setError(errorText)
        console.error(resp.body)
      }
    }
    catch {
    }
  }

  const handleSiginSignUp = () => {
    setShowSignIn(!showSignIn)
  }

  return (
    <div id="sign_in">
      <NavBar isSignin={true} />
      <div id="form_holder" className="su_form">
        <div id="form_header">
          <h3 id="sign_in_or_up">
            <span onClick={handleSiginSignUp}
              id={`sign_in_button`}
              className={"form_header" + (showSignIn ? " active" : '')}>
              Sign in
            </span> <br /> <span
              onClick={handleSiginSignUp}
              id="sign_up_button"
              className={"form_header" + (!showSignIn ? " active" : '')}>
              Sign up
            </span>
          </h3>
        </div>
        <div id="signin_form">


          <div id="slider" className={showSignIn ? "si" : "su"}>
            {showSignIn ?
              <SignInForm login={login} /> :
              <SignUpForm signup={signup} />
            }
          </div>

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
