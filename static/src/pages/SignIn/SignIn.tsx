import NavBar from "../../components/NavBar/NavBar.tsx"
import "./SignIn.scss"
import Button from "../../components/Button/Button.tsx"
import { useState } from 'react'
import { useNavigate } from "react-router"


export default function SignIn() {

  const navigate = useNavigate()

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
      }
    }
    catch {
      setError("error lol")
    }
  }

  return (
    <div id="sign_in">
      <NavBar isSignin={true} />
      <div id="form_holder">
        <div id="signin_form">
          <form onSubmit={login}>
            <h3>Sign in</h3>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="signin_email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="signin_pw" />
            <Button type="submit">Sign in</Button>

          </form>
          {error && (
            <div id="error">

            </div>
          )
          }

        </div>
      </div>

    </div>
  )
}
