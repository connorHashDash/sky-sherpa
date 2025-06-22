package duffel

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sky_save/internal/requestbuilder"
)

var duffelKey string

func DuffelInit(configKey string) error {
	if len(configKey) < 1 {
		return fmt.Errorf("string not valid")
	}
	duffelKey = configKey
	return nil
}

func FlightSearch(OfferRequest OfferRequest) (*OffersResponse, error) {

	outgoing := Slices{
		Origin:        OfferRequest.Flights[0].Origin,
		Destination:   OfferRequest.Flights[0].Destination,
		DepartureDate: OfferRequest.Flights[0].DepartureDate,
	}

	incoming := Slices{
		Origin:        OfferRequest.Flights[0].Destination,
		Destination:   OfferRequest.Flights[0].Origin,
		DepartureDate: OfferRequest.Flights[0].ReturnDate,
	}

	PassengerArray := []Passengers{}
	for i := 0; i < len(OfferRequest.Passenger); i++ {
		PassengerArray = append(PassengerArray, Passengers{
			Type: OfferRequest.Passenger[i].Type,
			Age:  OfferRequest.Passenger[i].Age,
		})
	}

	body := Data{
		FlightSearchRequestBody{
			[]Slices{outgoing, incoming},
			PassengerArray,
			"economy",
			"0",
		},
	}

	bodyBytes, err := json.MarshalIndent(body, "", "	")

	if err != nil {
		fmt.Printf("Json didn't Marshal\nError: %v", err)
	}

	resp, err := requestbuilder.Request(http.MethodPost, "https://api.duffel.com/air/offer_requests?limit=5",
		http.Header{
			"Content-Type":    {"application/json"},
			"Authorization":   {duffelKey},
			"Duffel-Version":  {"v2"},
			"Accept":          {"application/json"},
			"Accept-Encoding": {"gzip"},
			"Connection":      {"keep-alive"},
		}, string(bodyBytes))

	if err != nil {
		return nil, fmt.Errorf("Request Failed: %v", err)
	}

	OffersResponse := OffersResponse{}

	json.Unmarshal(resp, &OffersResponse)

	return &OffersResponse, nil
}
