import "./Button.scss"
import { Link } from 'react-router'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  extraClass?: string
  children: React.ReactNode
}

function LinkWrapper({ href, children }: { href?: string | null, children: React.ReactNode }) {
  return (
    <>
      {href ? (
        <Link className="button_link" to={href}>
          {children}
        </Link>
      ) : (
        <>
          {children}
        </>
      )}
    </>

  )
}

export default function Button({ children, href, extraClass, ...props }: ButtonProps) {

  return (
    <LinkWrapper href={href}>
      <button className={`button ${extraClass || ''}`} {...props}>
        {children}
      </button>
    </LinkWrapper >
  )
}
