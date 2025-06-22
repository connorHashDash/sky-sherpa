import './FlightCard.scss';

interface FlightCardProps {
  imageURL: string
  flightCode: string
  DestIATA: string
  DateTime: string
  Price: string
}

const FlightCard = ({ imageURL, flightCode, DestIATA, DateTime, Price }: FlightCardProps) => {
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
          <span className="status confirmed">Confirmed</span>
        </div>

        <div className="flight-info">
          <span className="route">LTN ⇄ {DestIATA}</span>
          <span className="datetime">{DateTime}</span>
          <span className="price">£{Price}</span>
        </div>

        <div className="passenger-name">Connor Black</div>
      </div>
    </div>
  );
};

export default FlightCard;

