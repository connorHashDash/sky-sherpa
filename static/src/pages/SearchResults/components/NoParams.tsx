import { Link } from "react-router-dom";
import "./NoParams.scss"

export default function NoParams(): JSX.Element {
  return (
    <p id="no_params">
      Looks like you haven't searched for anything! <br />
      <strong><Link to="/">Go Home</Link></strong>
    </p>
  )
}
