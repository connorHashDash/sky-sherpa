package database

import (
	"database/sql"
	"fmt"
	"log"
	"sky_save/internal/config"

	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

// Initialises the database connection.
//
// Should only be called once and the connection kept open.
func Init(Config config.MariaDbConf) error {

	cfg := mysql.Config{
		User:                 Config.UserName,
		Passwd:               Config.Passw,
		Net:                  Config.Net,
		Addr:                 Config.Addr,
		AllowNativePasswords: true,
		DBName:               Config.DbName,
	}

	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		return fmt.Errorf("Database failed to open\n%v", err)
	}

	if err := db.Ping(); err != nil {
		return fmt.Errorf("Database failed to ping\n%v", err)
	}

	err = Migration()

	if err != nil {
		log.Fatalf("Database migration failed, error below: \n %v", err)
	}

	return nil
}

func AddUser(user UserRegFormInput) error {

	_, err := db.Exec(`INSERT INTO sky_save.users 
                      (email, firstName, lastName, hashedPass, role) 
                      VALUES (?, ?, ?, ?, ?)`, user.Email, user.FirstName, user.LastName, user.HashedPw, 2)

	if err != nil {
		return fmt.Errorf("Failed to add new user to database\n%v", err)
	}

	return nil
}

func QueryUserExistence(email string) bool {

	result := db.QueryRow(`SELECT 1 FROM sky_save.users 
                          WHERE email = ?`, email)
	var scanned int

	err := result.Scan(&scanned)

	if err != nil {
		fmt.Println(err)
		return false
	}

	return scanned == 1
}

func GetHashedPassword(email string) string {

	result := db.QueryRow(`SELECT hashedPass
                            FROM sky_save.users u
                            WHERE email = ?`, email)

	var hashedPW string

	result.Scan(&hashedPW)

	return hashedPW
}

func CreateSession(sessionToken string, email string) error {
	_, err := db.Exec(`INSERT INTO sky_save.sessions (SessionId, Token, SessionStarted)
                    SELECT id, ?, CURTIME() FROM sky_save.users
                    WHERE email = ?`, sessionToken, email)

	if err != nil {
		fmt.Println(err)
		return err
	}

	return nil
}

func CheckExistingSession(email string) bool {
	res := db.QueryRow(`SELECT id from sky_save.users u 
							JOIN sky_save.sessions s 
							ON u.id = s.SessionId
							WHERE u.email = ?;`, email)

	var exists int
	res.Scan(&exists)
	return exists > 0
}

func GetSessionToken(email string) string {
	res := db.QueryRow(`SELECT Token from sky_save.users u 
							JOIN sky_save.sessions s 
							ON u.id = s.SessionId
							WHERE u.email = ?;`, email)

	var StoredToken string
	res.Scan(&StoredToken)

	return StoredToken
}

func KillSession(email string) error {
	_, err := db.Exec(`DELETE s 
            FROM sky_save.sessions s
            JOIN sky_save.users u
                ON u.id = s.SessionId
            WHERE u.email = ?;`, email)

	if err != nil {
		return err
	}

	return nil
}

// Gets the full Aiport name via the IATA code
func GetAirportByIATA(IATA string) AirportName {
	res := db.QueryRow(`SELECT a.name 
											FROM sky_save.airports a 
											WHERE a.iata_code = ?`, IATA)

	var AirportNameJson AirportName
	res.Scan(&AirportNameJson.Name)

	return AirportNameJson
}
