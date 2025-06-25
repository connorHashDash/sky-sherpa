package database

// Checks if the connected database has the correct tables and schema
func Migration() error {
	_, err := db.Exec(`CREATE SCHEMA IF NOT EXISTS sky_save`)

	if err != nil {
		return err

	}

	_, err = db.Exec(`
			CREATE TABLE IF NOT EXISTS airports (
			id INT(11) NOT NULL,
			ident VARCHAR(10) DEFAULT NULL,
			type VARCHAR(50) DEFAULT NULL,
			name VARCHAR(255) DEFAULT NULL,
			latitude_deg DOUBLE DEFAULT NULL,
			longitude_deg DOUBLE DEFAULT NULL,
			elevation_ft INT(11) DEFAULT NULL,
			continent VARCHAR(10) DEFAULT NULL,
			iso_country VARCHAR(2) DEFAULT NULL,
			iso_region VARCHAR(10) DEFAULT NULL,
			municipality VARCHAR(255) DEFAULT NULL,
			scheduled_service VARCHAR(3) DEFAULT NULL,
			icao_code VARCHAR(4) DEFAULT NULL,
			iata_code VARCHAR(3) DEFAULT NULL,
			gps_code VARCHAR(10) DEFAULT NULL,
			local_code VARCHAR(10) DEFAULT NULL,
			keywords TEXT DEFAULT NULL,
			popularity INT(11) DEFAULT NULL,
			PRIMARY KEY (id)
		) ENGINE=InnoDB
		DEFAULT CHARSET=utf8mb4
		COLLATE=utf8mb4_general_ci;
	`)

	if err != nil {
		return err

	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS sky_save.countries (
		id int(11) DEFAULT NULL,
		code varchar(50) DEFAULT NULL,
		name varchar(50) DEFAULT NULL,
		continent varchar(50) DEFAULT NULL,
		keywords varchar(64) DEFAULT NULL
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
	`)

	if err != nil {
		return err

	}

	_, err = db.Exec(`

CREATE TABLE IF NOT EXISTS sky_save.sessions (
  SessionId int(11) NOT NULL,
  Token varchar(43) DEFAULT NULL,
  SessionStarted time DEFAULT NULL,
  PRIMARY KEY (SessionId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
	`)

	if err != nil {
		return err

	}

	_, err = db.Exec(`
CREATE TABLE IF NOT EXISTS sky_save.users (
  id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  firstName varchar(255) DEFAULT NULL,
  lastName varchar(255) NOT NULL,
  hashedPass varchar(60) NOT NULL,
  role int(11) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY users_unique (email)
	) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`)

	if err != nil {
		return err

	}

	_, err = db.Exec(`
CREATE TABLE IF NOT EXISTS sky_save.eu_busiest (
  Rank int(11) DEFAULT NULL,
  Country varchar(50) DEFAULT NULL,
  Airport varchar(50) DEFAULT NULL,
  City served varchar(50) DEFAULT NULL,
  2024 varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`)

	return nil
}
