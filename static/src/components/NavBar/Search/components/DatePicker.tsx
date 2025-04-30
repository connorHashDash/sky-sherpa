import { Dispatch, SetStateAction } from "react"

import CustomDatePicker from "./Calendar"

import { CalenderProps } from "../Search"

export interface DatePickerProps extends CalenderProps {
  setIsReturn: Dispatch<SetStateAction<boolean>>
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  setDateSelected: Dispatch<SetStateAction<boolean>>

}

export default function DatePicker({ isReturn, setIsReturn, flightDate, setFlightDate, message, setMessage, setDateSelected }: DatePickerProps) {
  const handleDateSelection = () => {
    if (!isReturn && flightDate.from) {
      setDateSelected(true)
    }
    if (isReturn && flightDate.from && flightDate.to) {
      setDateSelected(true)
    }
    if (!flightDate.from || !flightDate.to) {
      setMessage("Please select a date")
      setTimeout(() => {
        setMessage("")
      }, 1600)
    }
  }

  return (
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
      <div id="date_message" className={(message ? "active" : '')}>
        {message}
      </div>
      <CustomDatePicker
        isReturn={isReturn}
        setFlightDate={setFlightDate}
        flightDate={flightDate}
      />
      <button onClick={handleDateSelection} className="button next_date">
        Next
      </button>

    </div>
  )
}
