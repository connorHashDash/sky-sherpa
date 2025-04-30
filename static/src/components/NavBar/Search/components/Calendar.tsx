import { useEffect } from "react";
import DatePicker from "react-datepicker";

import { CalenderProps } from "../Search";


export default function CustomDatePicker({ isReturn, flightDate, setFlightDate }: CalenderProps) {
  const onChange = (dates: [start: Date | null, end: Date | null]) => {
    const [start, end] = dates;
    if (start) {
      setFlightDate(() => {
        return {
          from: start,
          to: null
        }
      });
    }
    if (end) {
      setFlightDate(() => {
        return {
          ...flightDate,
          to: end
        }
      });
    }
  }

  useEffect(() => {
    setFlightDate({ from: null, to: null })
  }, [isReturn]);

  return (
    <>
      {isReturn ? (
        <DatePicker
          selected={flightDate.from}
          onChange={onChange}
          startDate={flightDate.from}
          endDate={flightDate.to}
          selectsRange
          inline
        />
      ) : (
        <DatePicker
          selected={flightDate.from}
          onChange={(date) => setFlightDate(() => { return { ...flightDate, from: date } })}
          inline
        />
      )
      }

    </>
  );
};

