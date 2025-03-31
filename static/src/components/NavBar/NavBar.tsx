import './NavBar.scss'
import SSLogoWhite from "../../assets/SkySherpaLogov3White.png"
import SSLogoBlue from "../../assets/SkySherpaLogov3BLUE.png"
import Button from "../Button/Button.tsx"
import { useState, useEffect } from 'react'
import { Link } from 'react-router'

interface NavbarTypes {
  isHome?: boolean
  isSignin?: boolean
}

export default function Navbar({ isHome, isSignin }: NavbarTypes) {
  const [isTop, setIsTop] = useState<boolean>(true)

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY != 0) {
        setIsTop(false)
      } else {
        setIsTop(true)
      }
    }
  }, [])

  return (
    <div id="nav_holder" className={isTop && isHome ? "top_home" : "generic"}>
      <div id="Nav_bar">
        <div id="nav_logo">
          <Link to="/">
            <img id='logo_img' src={isTop && isHome ? SSLogoWhite : SSLogoBlue} alt="Logo" />
          </Link>
        </div>
        <div id="nav_buttons">
          {!isSignin ? (
            <Button extraClass={isTop && isHome ? "top" : ""} href='/signin' >
              Sign In
            </Button>
          ) : (null)}

        </div>
      </div>
    </div >
  )
}
