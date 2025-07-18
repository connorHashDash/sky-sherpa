package database

/*
* The database has a few distinct types relating to users, flight info, and hotel info. This may
* be broken into smaller sub documents depending on how many are needed for easier organisation.
*
 */

// All the info that's given when a user registers for the site is in this struct.
// This is currently only used once for user registration.
//
// FirstName is nullable however a LastName is mandatory and is reflected on the frontend.
type UserRegFormInput struct {
	Email     string
	FirstName *string
	LastName  string
	HashedPw  string
}

type LoginJson struct {
	Token string `json:"token"`
}

type AirportName struct {
	Name string `json:"name"`
}
