package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"sky_save/internal/duffel"
	//	"sky_save/internal/auth"
)

func FlightOffer(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		er := http.StatusMethodNotAllowed
		http.Error(w, "Method Not Allowed", er)
		return
	}

	// 	if err := auth.AuthUser(r); err != nil {
	// 		er := http.StatusUnauthorized
	// 		http.Error(w, "Unauthorised", er)
	// 		return
	// 	}
	//
	// 	a random line
	// 	a random line
	// 	a random line

	reqBody, _ := io.ReadAll(r.Body)

	fmt.Println(string(reqBody))

	var reqBodyBytes duffel.OfferRequest
	json.Unmarshal(reqBody, &reqBodyBytes)

	FlightInfo, err := duffel.FlightSearch(reqBodyBytes)

	if err != nil {
		fmt.Printf("Duffel Flight Search failed with error\n%v", err)
	}

	responseBody, err := json.Marshal(FlightInfo)

	if err != nil {
		fmt.Printf("Duffel Flight JSON Marshal failed with error\n%v", err)
	}

	w.Write(responseBody)

}

func main() {
	http.HandleFunc("/flight_offers", FlightOffer)
	fmt.Println("listening on port 8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
