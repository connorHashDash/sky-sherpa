import { Dispatch, SetStateAction } from "react"
import { AutoSuggestAirports, AutoSuggestCountries, DestinationType, SearchProps } from "../Search"

interface SearchBarProps extends SearchProps {
  setAutoSuggest: Dispatch<SetStateAction<Array<AutoSuggestAirports | AutoSuggestCountries> | undefined>>
  destination: DestinationType | undefined
}

export default function SearchBar({ setAutoSuggest, destination, setSearchClicked }: SearchBarProps) {

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

  return (
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
  )
}
