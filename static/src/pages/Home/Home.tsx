import Navbar from "../../components/NavBar/NavBar"
import Splash from "./components/Splash"
import Waves from "./components/Waves"
import Carousel from "../../components/Carousel/Carousel"

import "./Home.scss"

export default function Home() {
  return (
    <div id="Home">
      <Navbar isHome={true} />
      <Splash />
      <Waves />


      <div className="content_wrapper">
        <div className="content" id="top_holidays">
          <h1>
            Top Holidays
          </h1>
          <h2>
            Unmissable destinations
          </h2>
        </div>
      </div>
      {//<Carousel />
      }
      <div className="Footer">

      </div>
    </div>
  )
}
