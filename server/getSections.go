package main

import (
	"database/sql"
	"encoding/json"
	"github.com/julienschmidt/httprouter"
	"log"
	"net/http"
)

const allSections = `SELECT id, name, description
                     FROM section;`

// Gets a list of sections
func getSections(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	db, err := getDb()
	if err != nil {
		log.Fatal(err)
		return
	}
	defer db.Close()

	rows, err := db.Query(allSections)
	if err != nil {
		log.Fatal(err)
		return
	}

	var sections []Section
	for rows.Next() {
		var s Section
		var desc sql.NullString
		err := rows.Scan(&s.ID, &s.Name, &desc)
		if desc.Valid {
			s.Description = desc.String
		} else {
			s.Description = ""
		}
		if err != nil {
			log.Println("Error while scanning rows into Post struct.")
			log.Fatal(err)
			return
		}
		sections = append(sections, s)
	}

	jsn, err := json.Marshal(sections)
	send(w, jsn)
}
