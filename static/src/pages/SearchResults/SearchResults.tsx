import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import { useEffect, useState } from 'react'
import NoParams from "./components/NoParams";
import { FlightOffer } from "./types";

import "./SearchResults.scss"
import FlightCard from "./components/FlightCard";

// interface


export default function SearchResults(): JSX.Element {

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false)
  const [name, setName] = useState<string | undefined>(undefined);
  const [list, setList] = useState<FlightOffer[] | undefined>(undefined)


  const [params] = useSearchParams(undefined)

  const getName = async (IATA: string) => {
    try {
      const resp = await fetch(`http://localhost:8080/api/iatatoname?iata=${IATA}`)
      const respJson = await resp.json()
      setName(respJson.name)
    } catch {
      setError(true)
    }
  }

  const getFlightOffers = async () => {
    const depDate: string = new Date(params.get("fdFrom")!).toISOString().split("T")[0]
    const retDate: string = new Date(params.get("fdTo")!).toISOString().split("T")[0]

    try {
      const resp = await fetch("http://localhost:8080/api/flight_offers", {
        method: "POST",
        headers: {
          "Accept-Encoding": "gzip",
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "flights": [
            {
              "origin": "LTN",
              "destination": params.get("destination"),
              "departure_date": depDate,
              "return_date": retDate
            }
          ],
          "passenger": [
            {
              "type": "adult"
            },
          ],
          "return_flight": true
        })

      })
      const respJson = await resp.json()
      setList(respJson.data.offers)

    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getName(params.get("destination")!)
    getFlightOffers()
  }, [])

  useEffect(() => {
    console.log(list)
  }, [list])

  return (
    <>
      <Navbar isHome={false} />
      {
        !params.get("destination") && <NoParams />
      }
      <div className="search_results">
        <div className="ap_name">
          <h1>{name}</h1>
        </div>
        <div className="result_list">
          {
            list && list.map((offer) => {
              return (
                <FlightCard
                  key={offer.id}
                  imageURL={offer.owner.logo_symbol_url}
                  DestIATA={params.get("destination")!}
                  flightCode={`${offer.owner.iata_code}${offer.slices[0].segments[0].marketing_carrier_flight_number}`}
                  Price={offer.total_amount}
                  DateTime={offer.slices[0].segments[0].departing_at}
                />

              )
            })
          }
        </div>
      </div>
    </>

  )
}
