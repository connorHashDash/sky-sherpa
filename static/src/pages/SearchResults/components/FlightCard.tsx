import './FlightCard.scss';

interface FlightCardProps {
  imageURL: string
  flightCode: string
  DestIATA: string
  Date: string
  Time: string
  Price: string
}

const FlightCard = ({ imageURL, flightCode, DestIATA, Date, Time, Price }: FlightCardProps): JSX.Element => {



  return (
    <div className="flight-card">
      <img
        src={imageURL}
        alt="Airline Logo"
        className="airline-logo"
      />

      <div className="flight-details">
        <div className="flight-header">
          <span className="flight-code">{flightCode}</span>
          <span className="status confirmed">Book now/ Wait</span>
        </div>

        <div className="flight-info">
          <span className="route">LTN ⇄ {DestIATA}</span>
          <span className="datetime">{Time} {Date}</span>
          <span className="price">
            <strong>
              £{Price}
            </strong>
          </span>
        </div>

        <div className="passenger-name">Connor Black</div>
      </div>
    </div>
  );
};

export default FlightCard;

