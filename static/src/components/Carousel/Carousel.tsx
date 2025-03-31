import "./Carousel.scss"

export default function Carousel() {
  return (
    <div className="carousel">
      <div className="destination_card">
        <h1>
          Luton
        </h1>
        <img src="https://placehold.co/230x300" alt="" />
        <p>Pizza! Pasta! Sprits!</p>
      </div>
      <div className="destination_card">
        <h1>Naples</h1>
        <img src="https://placehold.co/230x300" alt="" />
        <p>
          Pizza! Pasta! Sprits!
        </p>
      </div>
    </div>
  )
}
