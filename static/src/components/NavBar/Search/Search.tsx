import { Dispatch, SetStateAction, useEffect, useState } from "react";

import "./Search.scss";
import CustomDatePicker from "./components/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../Button/Button";

interface SearchProps {
  setSearchClicked: Dispatch<SetStateAction<boolean>>
}

interface AutoSuggestAirports {
  type: string
  name: string
  country: string
  municipality: string
  iata: string
}

interface AutoSuggestCountries {
  type: string
  name: string
  iso_code: string
}

interface DestinationType {
  long: string
  code: string
}

export interface CalenderProps {
  setFlightDate: Dispatch<SetStateAction<FlightDateInfo>>
  flightDate: FlightDateInfo
  isReturn: Boolean
}

export interface FlightDateInfo {
  from: Date | null
  to: Date | null
}

export default function Search({ setSearchClicked }: SearchProps) {
  const [autoSuggest, setAutoSuggest] = useState<Array<AutoSuggestAirports | AutoSuggestCountries> | undefined>()
  const [destination, setDestination] = useState<DestinationType | undefined>()
  const [isReturn, setIsReturn] = useState<boolean>(true)
  const [flightDate, setFlightDate] = useState<FlightDateInfo>({ from: null, to: null })

  useEffect(() => {
    console.log(flightDate)
  }, [flightDate])

  const getAutoSuggest = async (searchVal: string) => {
    if (searchVal.length <= 1) {
      setAutoSuggest(undefined)
      return
    }

    try {
      const searchParam: string = "apsearch=" + searchVal
      const resp = await fetch(`http://localhost:8080/api/ac/airports?${searchParam}`)
      const respJson = await resp.json()
      setAutoSuggest(respJson)
    } catch {

    }
  }

  useEffect(() => {
    setAutoSuggest(undefined)
  }, [destination])

  return (
    <div id='search_menu'>
      <div id="search_bar">
        <div className='mag_glass' >
          <svg
            width="1em" height="1em" viewBox="0 0 20 20" className="align-middle me-3 text-gray-30 shrink-0 group-betterhover:hover:text-gray-70">
            <path d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round">
            </path>
          </svg>
        </div>
        <input
          autoFocus
          placeholder='Search'
          onChange={(e) => getAutoSuggest(e.target.value)}
          id='search_bar_input'
          value={destination?.long}
          type="text" />
        <button id="exit_search" onClick={() => setSearchClicked(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24"
            strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /> </svg>
        </button>
      </div>

      {
        autoSuggest && !destination && (
          <div id="suggestions">
            <ul>
              {
                autoSuggest.map((suggestion: AutoSuggestAirports | AutoSuggestCountries) => {
                  if (suggestion.type == "Airport") {
                    const airport = suggestion as AutoSuggestAirports
                    return (
                      <li onClick={() => setDestination(() => { return { long: airport.name, code: airport.iata } })} className="ap" key={airport.iata}>
                        {airport.name},
                        {airport.country}
                      </li>
                    )
                  } else if (suggestion.type == "Country") {
                    const country = suggestion as AutoSuggestCountries
                    return (
                      <li onClick={() => setDestination(() => { return { long: country.name, code: country.iso_code } })} className="co" key={country.iso_code}>
                        {country.name}
                      </li>
                    )
                  }
                }
                )
              }
            </ul>
          </div>
        )
      }

      {destination && (
        <div id="date_picker">
          <div id="date_top">
            <button onClick={() => setIsReturn(false)}
              className={`return_single_buttons  left ${(!isReturn ? "active" : '')}`}>
              One-Way
            </button>
            <button onClick={() => setIsReturn(true)}
              className={`return_single_buttons  right ${(isReturn ? "active" : '')}`}>
              Return
            </button>
          </div>

          <CustomDatePicker
            isReturn={isReturn}
            setFlightDate={setFlightDate}
            flightDate={flightDate}
          />
          <Button extraClass="next_date">
            Next
          </Button>

        </div>
      )
      }



    </div>
  )
} 
