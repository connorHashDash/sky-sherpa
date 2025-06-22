import { Dispatch, SetStateAction, useEffect, useState } from "react";

import DatePicker from "./components/DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import Suggestions from "./components/Suggestions.tsx"
import SearchBar from "./components/SearchBar.tsx"
import { useNavigate } from "react-router-dom";


import "./Search.scss";

export interface SearchProps {
  setSearchClicked: Dispatch<SetStateAction<boolean>>
}

export interface AutoSuggestAirports {
  type: string
  name: string
  country: string
  municipality: string
  iata: string
}

export interface AutoSuggestCountries {
  type: string
  name: string
  iso_code: string
}

export interface DestinationType {
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
  const navigate = useNavigate()

  const [autoSuggest, setAutoSuggest] = useState<Array<AutoSuggestAirports | AutoSuggestCountries> | undefined>();
  const [destination, setDestination] = useState<DestinationType | undefined>();
  const [isReturn, setIsReturn] = useState<boolean>(true);
  const [flightDate, setFlightDate] = useState<FlightDateInfo>({ from: null, to: null });
  const [dateSelected, setDateSelected] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setAutoSuggest(undefined)
  }, [destination])

  const handleSearch = () => {
    const params = new URLSearchParams({
      destination: destination!.code,
      isReturn: isReturn.toString(),
      fdFrom: encodeURIComponent(flightDate.from!.toISOString().split('T')[0]),
      fdTo: encodeURIComponent(flightDate.to!.toISOString().split('T')[0]),
    })
    navigate(`/search?${params.toString()}`);
  }

  return (
    <div id='search_menu'>
      <SearchBar
        setSearchClicked={setSearchClicked}
        destination={destination}
        setAutoSuggest={setAutoSuggest}
      />

      {
        autoSuggest && !destination && (
          <Suggestions autoSuggest={autoSuggest} setDestination={setDestination} />
        )
      }

      {destination && !dateSelected && (
        <DatePicker
          setFlightDate={setFlightDate}
          flightDate={flightDate}
          isReturn={isReturn}
          setIsReturn={setIsReturn}
          message={message}
          setMessage={setMessage}
          setDateSelected={setDateSelected}
        />
      )
      }
      {
        dateSelected && (
          <div id="finalised">
            <strong>{destination!.long}</strong> <br />
            <strong>Leaving on:</strong> {flightDate!.from!.toLocaleDateString("en-gb")} <br />
            {isReturn && (<>
              <strong>Returning on:</strong>

              {flightDate.to!.toLocaleDateString("en-gb")}
            </>)}
            <button onClick={handleSearch} id="search" className="button">Search</button>
          </div>
        )
      }
    </div>
  )
} 
