package database

import (
	"database/sql"
	"fmt"
	"sky_save/internal/config"

	"github.com/go-sql-driver/mysql"
)

var db *sql.DB

func Init(Config config.MariaDbConf) error {
	// Should only be called once and the connection kept open

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

	return nil
}

func AddUser(user UserRegFormInput) error {

	_, err := db.Exec(`INSERT INTO sky_save.users 
                      (email, firstName, lastName, hashedPass, role) 
                      VALUES (?, ?, ?, ?, ?)`, user.Email, user.FirstName, user.LastName, user.HashedPw, 1)

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

func AutoComplete(input string) ([]AutoCompleteResponse, error) {
	if len(input) <= 1 {
		return nil, nil
	}

	// Quote marks with variables aren't allowed in SQL, so the wrapping needs to happen here
	searchPattern := "%" + input + "%"
	res, err := db.Query(`SELECT a.name, a.iso_country, a.municipality, a.iata_code 
													FROM sky_save.airports a 
													WHERE a.name 
													LIKE ?
													ORDER BY a.type
													LIMIT 10`, searchPattern)
	defer res.Close()

	if err != nil {
		return nil, err
	}

	var AutoCompArr []AutoCompleteResponse

	for res.Next() {
		var ac AutoCompleteResponse
		err = res.Scan(&ac.Name, &ac.Country, &ac.Municipality, &ac.IATA)

		AutoCompArr = append(AutoCompArr, ac)
	}

	if err != nil {
		return nil, err
	}

	return AutoCompArr, nil

}
