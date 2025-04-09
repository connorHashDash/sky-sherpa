import { Dispatch, SetStateAction, useState } from "react";
import "./Search.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface SearchProps {
  setSearchClicked: Dispatch<SetStateAction<boolean>>
}

export default function Search({ setSearchClicked }: SearchProps) {
  const [startDate, setStartDate] = useState<Date>(new Date)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [isReturn, setIsReturn] = useState<boolean>(false)
  const [destinationIsPicked, setDestinationIsPicked] = useState<boolean>(false)

  const onDateChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <div id='search_menu'>
      <div id="search_bar">
        <div className='mag_glass' >
          <svg
            width="1em" height="1em" viewBox="0 0 20 20" className="align-middle me-3 text-gray-30 shrink-0 group-betterhover:hover:text-gray-70">
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
        <input
          autoFocus
          placeholder='Search'
          id='search_bar_input'
          type="text" />
        <button id="exit_search" onClick={() => setSearchClicked(false)}>
          <svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" /> </svg>
        </button>
      </div>
      <div id="return_picker_outer_div">
        <label htmlFor="return_picker">Return</label>
        <input onChange={() => setIsReturn(!isReturn)} type="checkbox" name="return_picker" id="" />
      </div>

      <div id="date_outer_div">
        <div id="dates_as_text">
          <div><p id="to_from">From:</p>{startDate.toLocaleDateString()}</div>
          {isReturn && (
            <div><p id="to_from">To:</p>
              {endDate && endDate.toLocaleDateString()}

            </div>
          )}
        </div>
        <DatePicker
          selected={startDate}
          startDate={startDate}
          inline
          selectsRange
          endDate={endDate}
          onChange={onDateChange}
        />
      </div>
    </div>
  )
} 
