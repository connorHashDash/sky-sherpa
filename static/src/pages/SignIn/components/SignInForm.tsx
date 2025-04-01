import { FormEventHandler } from "react"
import Button from "../../../components/Button/Button.tsx"



interface SignInFormProps {
  login: FormEventHandler

}

export default function SignInForm({ login }: SignInFormProps) {
  return (
    <form onSubmit={login}>

      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="signin_email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="signin_pw" />
      <Button extraClass="signin_button" type="submit">Sign in</Button>
    </form>)
}
