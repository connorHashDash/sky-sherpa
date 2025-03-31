package config

import (
	"encoding/json"
	"os"
)

type Test struct {
	Key string `json:"key"`
}

type Config struct {
	ServerConfig ServerConfig `json:"server_conf"`
	MariaDbConf  MariaDbConf  `json:"mariadb_conf"`
	DuffelConf   DuffelConf   `json:"duffel"`
	Files        Files        `json:"files"`
}

type ServerConfig struct {
	Port          string `json:"port"`
	LogsDirectory string `json:"logs_dir"`
	Cert          string `json:"ssl_cert"`
	PrivKey       string `json:"ssl_priv_key"`
	IsSsl         bool   `json:"ssl"`
}

type MariaDbConf struct {
	UserName string `json:"username"`
	Passw    string `json:"passw"`
	Net      string `json:"net"`
	Addr     string `json:"addr"`
	DbName   string `json:"db_name"`
}

type DuffelConf struct {
	Key string `json:"key"`
}

type Files struct {
	Dir string `json:"dir"`
}

func InitConfig() (Config, error) {
	var returnedConf Config
	confFile, err := os.ReadFile("./config.json")
	if err != nil {
		return returnedConf, err
	}

	err = json.Unmarshal(confFile, &returnedConf)
	if err != nil {
		return returnedConf, err
	}

	return returnedConf, nil
}
