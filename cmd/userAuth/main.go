package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/mail"

	"sky_save/internal/config"
	"sky_save/internal/database"
	"sky_save/internal/duffel"
	"sky_save/internal/encrypt"
)

func Authorise(r *http.Request) error {
	email := r.Header.Get("email")

	if exists := database.QueryUserExistence(email); !exists {
		return fmt.Errorf("Not registered, email not found")
	}

	requestSessionToken := r.Header.Get("Authorization")

	requestSessionToken = requestSessionToken[7:] // Postman adds "Bearer " to the beginning of the key. Just being lazy.
	storedSessionToken := database.GetSessionToken(email)
	if storedSessionToken != requestSessionToken {
		return fmt.Errorf("Tokens do not match")
	}

	return nil
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func register(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		er := http.StatusMethodNotAllowed
		http.Error(w, "Invalid HTTP Method", er)
		return
	}

	email := r.FormValue("email")
	if _, err := mail.ParseAddress(email); err != nil {
		er := http.StatusNotAcceptable
		http.Error(w, "Email not valid", er)
		return
	}

	if exists := database.QueryUserExistence(email); exists {
		er := http.StatusNotAcceptable
		http.Error(w, "user already registered", er)
		return
	}

	unHashedpassword := r.FormValue("password")
	if len(unHashedpassword) < 8 {
		er := http.StatusNotAcceptable
		http.Error(w, "Password length invalid", er)
		return
	}
	if exists := database.QueryUserExistence(email); exists {
		er := http.StatusNotAcceptable
		http.Error(w, "Username already registered", er)
		return
	}

	hashedPassword, _ := encrypt.HashPassword(unHashedpassword)
	firstName := r.FormValue("firstName")

	lastName := r.FormValue("lastName")

	user := database.UserRegFormInput{
		Email:     email,
		FirstName: &firstName,
		LastName:  lastName,
		HashedPw:  hashedPassword,
	}

	err := database.AddUser(user)
	if err != nil {
		er := http.StatusInternalServerError
		http.Error(w, "Failed to add user", er)
		fmt.Println(err)
		return
	}
	w.Write([]byte("Registered"))
}

func login(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	if r.Method != http.MethodPost {
		er := http.StatusMethodNotAllowed
		http.Error(w, "Invalid HTTP Method", er)
		return
	}
	email := r.FormValue("email")

	if sessionExists := database.CheckExistingSession(email); sessionExists {
		if err := database.KillSession(email); err != nil {
			er := http.StatusInternalServerError
			http.Error(w, "Cannot log in due to inability to terminate previous session", er)
			return
		}
	}

	if exists := database.QueryUserExistence(email); !exists {
		err := http.StatusNotAcceptable
		http.Error(w, "Not registered", err)
		return
	}

	password := r.FormValue("password")
	hashedPw := database.GetHashedPassword(email)

	if pwMatch := encrypt.ValidatePassword(hashedPw, password); !pwMatch {
		err := http.StatusNotAcceptable
		http.Error(w, "Password Incorrect", err)
		return
	}

	SessionToken := encrypt.SessionTokenGenerate(32)

	err := database.CreateSession(SessionToken, email)

	if err != nil {
		fmt.Println(err)
		er := http.StatusInternalServerError
		http.Error(w, "Failed to create session", er)
		return
	}

	w.Header().Add("Content-Type", "application/json")

	respToken := database.LoginJson{
		Token: SessionToken,
	}

	json.NewEncoder(w).Encode(respToken)
}

func logout(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		er := http.StatusMethodNotAllowed
		http.Error(w, "Method Not Allowed", er)
		return
	}

	if err := Authorise(r); err != nil {
		fmt.Println(err)
		er := http.StatusUnauthorized
		http.Error(w, "Authentication Failed", er)
		return
	}

	err := database.KillSession(r.Header.Get("email"))

	if err != nil {
		fmt.Println(err)
		er := http.StatusInternalServerError
		http.Error(w, "Error ending your session", er)
		return
	}

	w.Write([]byte("Logged out"))

}

func AuthoriseCall(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		er := http.StatusMethodNotAllowed
		http.Error(w, "Method Not Allowed", er)
		return
	}

	if err := Authorise(r); err != nil {
		er := http.StatusUnauthorized
		http.Error(w, "Not Authorised invalid credentials", er)
		return
	}

	w.Write([]byte("Authorised"))
}

func main() {
	Config, err := config.InitConfig()
	if err != nil {
		log.Fatal(err)
	}

	err = database.Init(Config.MariaDbConf)
	if err != nil {
		log.Fatal(err)
	}

	err = duffel.DuffelInit(Config.DuffelConf.Key)
	if err != nil {
		log.Fatal(err)
	}

	files := http.FileServer(http.Dir(Config.Files.Dir))

	http.Handle("/", files)
	http.HandleFunc("/api/register", register)
	http.HandleFunc("/api/login", login)
	http.HandleFunc("/api/logout", logout)
	http.HandleFunc("/api/Authorise", AuthoriseCall)

	if Config.ServerConfig.IsSsl {
		fmt.Printf("Running on %v with https\n", Config.ServerConfig.Port)
		log.Fatal(
			http.ListenAndServeTLS(Config.ServerConfig.Port,
				Config.ServerConfig.Cert,
				Config.ServerConfig.PrivKey,
				nil))
	} else {
		fmt.Printf("Running on http://%v with http\n", Config.ServerConfig.Port)
		log.Fatal(http.ListenAndServe(Config.ServerConfig.Port, nil))
	}
}
