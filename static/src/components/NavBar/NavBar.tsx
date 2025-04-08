import './NavBar.scss'
import SSLogoWhite from "../../assets/SkySherpaLogov3White.png"
import SSLogoBlue from "../../assets/SkySherpaLogov3BLUE.png"
import Button from "../Button/Button.tsx"
import Search from "./Search/Search.tsx"
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router'
import { UserStatus } from "../../main.tsx"


interface NavbarTypes {
  isHome?: boolean
  isSignin?: boolean
}


export default function Navbar({ isHome, isSignin }: NavbarTypes) {
  const [isTop, setIsTop] = useState<boolean>(true)
  const [searchClicked, setSearchClicked] = useState<boolean>(false)

  const loggedIn = useContext<boolean | null>(UserStatus)

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY != 0) {
        setIsTop(false)
      } else {
        setIsTop(true)
      }
    }
    console.log(loggedIn)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key == "Escape") {
        setSearchClicked(false)
      }
    })
  }, [searchClicked])

  return (
    <>
      <div id="nav_holder" className={isTop && isHome ? "top_home" : "generic"}>
        <div id="Nav_bar">
          <div id="nav_logo">
            <Link to="/">
              <img id='logo_img' src={isTop && isHome ? SSLogoWhite : SSLogoBlue} alt="Logo" />
            </Link>
          </div>
          <div id="search">
            <button onClick={() => { setSearchClicked(!searchClicked) }} id='search_bar_button' >
              <div className='mag_glass' >
                <svg width="1em" height="1em" viewBox="0 0 20 20" className="align-middle me-3 text-gray-30 shrink-0 group-betterhover:hover:text-gray-70">
                  <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                  </path>
                </svg>
              </div>
              <span id='search_text'>
                Search
              </span>
            </button>
          </div>
          <div id="nav_buttons">
            {loggedIn ? (null) :
              !isSignin ? (
                <Button extraClass={isTop && isHome ? "top" : ""} href='/signin' >
                  Sign In
                </Button>
              ) : (null)}

          </div>
        </div>
      </div>
      {searchClicked && (
        <Search />
      )}

    </>
  )
}
