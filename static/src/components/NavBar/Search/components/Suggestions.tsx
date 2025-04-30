import { Dispatch, SetStateAction } from "react"
import { AutoSuggestAirports, AutoSuggestCountries, DestinationType } from "../Search"

interface SuggestionProps {
  autoSuggest: Array<AutoSuggestAirports | AutoSuggestCountries>
  setDestination: Dispatch<SetStateAction<DestinationType | undefined>>
}

export default function Suggestions({ autoSuggest, setDestination }: SuggestionProps) {

  return (
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
