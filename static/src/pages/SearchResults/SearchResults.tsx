import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";
import { useEffect, useState } from 'react'
import NoParams from "./components/NoParams";
import { FlightOffer } from "./types";

import "./SearchResults.scss"
import FlightCard from "./components/FlightCard";
import { useNavigate } from "react-router-dom";

// interface


export default function SearchResults(): JSX.Element {
  const navigte = useNavigate()

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


  useEffect((): void => {
    getName(params.get("destination")!)
    getFlightOffers()
  }, [])

  useEffect((): void => {
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
          <div id="outgoing"><h2>Outgoing</h2>
            {
              list && list.map((offer: FlightOffer): JSX.Element => {
                let dateAndTime = offer.slices[0].segments[0].departing_at

                const Time = dateAndTime.substring(11, dateAndTime.length - 3)
                const Date = dateAndTime.substring(0, 9);
                return (
                  <FlightCard
                    key={offer.id}
                    imageURL={offer.owner.logo_symbol_url}
                    DestIATA={params.get("destination")!}
                    flightCode={`${offer.owner.iata_code}${offer.slices[0].segments[0].marketing_carrier_flight_number}`}
                    Price={offer.total_amount}
                    Date={Date}
                    Time={Time}
                    IsReturn={false}
                  />
                )
              })
            }
          </div>
          {params.get("isReturn") == "true" && (

            <div id="return"><h2>Return</h2>
              {
                list && list.map((offer: FlightOffer): JSX.Element => {
                  let dateAndTime = offer.slices[1].segments[0].departing_at

                  const Time = dateAndTime.substring(11, dateAndTime.length - 3)
                  const Date = dateAndTime.substring(0, 9);
                  return (
                    <FlightCard
                      key={offer.id}
                      imageURL={offer.owner.logo_symbol_url}
                      DestIATA={params.get("destination")!}
                      flightCode={`${offer.owner.iata_code}${offer.slices[1].segments[0].marketing_carrier_flight_number}`}
                      Price={offer.total_amount}
                      Date={Date}
                      Time={Time}
                      IsReturn={true}
                    />
                  )
                })
              }
            </div>
          )
          }
        </div>
      </div>
    </>

  )
}
