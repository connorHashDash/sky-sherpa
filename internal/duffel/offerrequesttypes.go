package duffel

/*
* The JSON response for flight offers is truly massive, rather than bog down the main file with all the types to
* unmarshal the JSON, it's kept here.
 */

// REQUEST

// All the relevant info for the Flight-Offer function to make its call.
type OfferRequest struct {
	Flights      []FlightInfo    `json:"flights"`
	Passenger    []PassengerInfo `json:"passenger"`
	ReturnFlight bool            `json:"return_flight"`
}

type FlightInfo struct {
	Origin        string `json:"origin"`
	Destination   string `json:"destination"`
	DepartureDate string `json:"departure_date"`
	ReturnDate    string `json:"return_date"`
}

type PassengerInfo struct {
	Age  int    `json:"age,omitempty"`
	Type string `json:"type,omitempty"`
}

// Main wrapper for request JSON
type Data struct {
	Data FlightSearchRequestBody `json:"data"`
}

type FlightSearchRequestBody struct {
	Slices         []Slices     `json:"slices"`
	Passengers     []Passengers `json:"passengers"`
	CabinClass     string       `json:"cabin_class"`
	MaxConnections string       `json:"max_connections"`
}

type Slices struct {
	Origin        string `json:"origin"`
	Destination   string `json:"destination"`
	DepartureDate string `json:"departure_date"`
}

type Passengers struct {
	Type string `json:"type,omitempty"`
	Age  int    `json:"age,omitempty"`
}

// RESPONSE

// OffersResponse is the main container struct
type OffersResponse struct {
	Data struct {
		Offers []Offer `json:"offers"`
	} `json:"data"`
}

// Offer represents a single flight offer
type Offer struct {
	ID            string      `json:"id"`
	TotalCurrency string      `json:"total_currency"`
	TotalAmount   string      `json:"total_amount"`
	Slices        []Slice     `json:"slices"`
	Passengers    []Passenger `json:"passengers"`
	UpdatedAt     string      `json:"updated_at"`
	ExpiresAt     string      `json:"expires_at"`
	Partial       bool        `json:"partial"`
	Owner         Carrier     `json:"owner"`
}

// PaymentRequirements for the offer
type PaymentRequirements struct {
	RequiresInstantPayment  bool   `json:"requires_instant_payment"`
	PriceGuaranteeExpiresAt string `json:"price_guarantee_expires_at"`
	PaymentRequiredBy       string `json:"payment_required_by"`
}

// Slice represents a flight segment group
type Slice struct {
	ComparisonKey string    `json:"comparison_key"`
	Segments      []Segment `json:"segments"`
	Duration      string    `json:"duration"`
	Destination   Location  `json:"destination"`
	Origin        Location  `json:"origin"`
}

// Segment represents a single flight
type Segment struct {
	DepartingAt               string             `json:"departing_at"`
	ArrivingAt                string             `json:"arriving_at"`
	OperatingCarrier          Carrier            `json:"operating_carrier"`
	MarketingCarrier          Carrier            `json:"marketing_carrier"`
	OperatingCarrierFlightNum string             `json:"operating_carrier_flight_number"`
	MarketingCarrierFlightNum string             `json:"marketing_carrier_flight_number"`
	Distance                  string             `json:"distance"`
	Passengers                []SegmentPassenger `json:"passengers"`
	Duration                  string             `json:"duration"`
	Destination               Location           `json:"destination"`
	Origin                    Location           `json:"origin"`
}

// Carrier represents an airline
type Carrier struct {
	IATACode                string `json:"iata_code"`
	ConditionsOfCarriageURL string `json:"conditions_of_carriage_url"`
	LogoLockupURL           string `json:"logo_lockup_url"`
	LogoSymbolURL           string `json:"logo_symbol_url"`
}

// SegmentPassenger represents passenger-specific details for a segment
type SegmentPassenger struct {
	Cabin                   Cabin     `json:"cabin"`
	Baggages                []Baggage `json:"baggages"`
	CabinClass              string    `json:"cabin_class"`
	CabinClassMarketingName string    `json:"cabin_class_marketing_name"`
	FareBasisCode           string    `json:"fare_basis_code"`
}

// Cabin represents cabin details
type Cabin struct {
	Name string `json:"name"`
}

// Baggage represents baggage allowance
type Baggage struct {
	Quantity int    `json:"quantity"`
	Type     string `json:"type"`
}

// Location represents an airport or city
type Location struct {
	ID              string `json:"id"`
	Name            string `json:"name"`
	Type            string `json:"type"`
	TimeZone        string `json:"time_zone"`
	IATACode        string `json:"iata_code"`
	ICAOCode        string `json:"icao_code"`
	IATACountryCode string `json:"iata_country_code"`
	IATACityCode    string `json:"iata_city_code"`
	CityName        string `json:"city_name"`
}

// Passenger represents passenger details
type Passenger struct {
	ID         string      `json:"id"`
	Type       string      `json:"type"`
	Age        interface{} `json:"age"`
	GivenName  interface{} `json:"given_name"`
	FamilyName interface{} `json:"family_name"`
}
