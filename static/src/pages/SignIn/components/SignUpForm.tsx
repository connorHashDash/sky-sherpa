import { FormEventHandler, useState } from "react"
import Button from "../../../components/Button/Button"

interface Props {
  signup: FormEventHandler
}

export default function SignUpForm({ signup }: Props) {
  //  const [errors, SetError] = useState(null)

  return (
    <form onSubmit={signup}>
      <label htmlFor="email">Email</label>
      <input required type="text" name="email" id="" />
      <label htmlFor="fname">First Name</label>
      <input type="text" name="fname" id="" />
      <label htmlFor="lname">Last Name</label>
      <input type="text" name="lname" id="" />
      <label htmlFor="password">Password</label>
      <input required type="text" name="password" id="" />
      <label htmlFor="password">Retype Password</label>
      <input required type="text" name="password" id="" />
      <Button extraClass="signin_button">Sign up</Button>
    </form>
  )
}
