import Plane from "../../../assets/plane.png"
import Cloud from "../../../assets/clouds.png"
import Cloud2 from "../../../assets/clouds2.png"
import Cloud3 from "../../../assets/clouds3.png"
import { useEffect, useState } from "react";

import "./Splash.scss"

const randomNumber = (max: number): number => {
  return Math.floor(Math.random() * max)
}

const randomNumberRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getInverseValue(input: number): number {
  const inMin = 200;  
  const inMax = 390;  
  const outMax = 13;  
  const outMin = 7;   
  
  const normalized = (input - inMin) / (inMax - inMin);

  return outMax - (normalized * (outMax - outMin));
}

function Clouds() {
  let [renderedClouds, setRenderedClouds] = useState<Array<JSX.Element>>([]);
  const maxClouds = 10
  let position = randomNumberRange(400, 40)
  let width = randomNumberRange(390, 200)
  const clouds = [
    Cloud,
    Cloud2,
    Cloud3
  ]

  useEffect(() => {
    if (renderedClouds.length < maxClouds) {
      setTimeout(() => {
        setRenderedClouds(() => {
          return [
            ...renderedClouds,
            <img className="cloud_img"
              style={{
                top: `${position}px`,
                width: `${width}px`,
                animation: `cloud ${getInverseValue(position)}s linear infinite`,
                zIndex: `${position > 225 ? "3" : "1"}`
              }} key={renderedClouds.length}
              src={clouds[randomNumber(clouds.length)]} alt="" />
          ]
        })
      }, 1000);
    }
  })

  return renderedClouds
}

export default function Splash() {
  return (
    <div id="splash">
      <div id="back_layer">
        <div id="plane_div">
          <img id="plane_image" src={Plane} alt="" />
        </div>
        <div id="tag_line">
          <h1>
            Fly the <br /> easy way

          </h1>
        </div>
      </div>
      <div id="clouds">
        <Clouds />
      </div>
    </div>
  )
}
