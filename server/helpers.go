package main

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

func getDb() (*sql.DB, error) {
	return sql.Open("sqlite3", "./own_site_test")
}
