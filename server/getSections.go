package main

import (
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
  "net/http"
  "github.com/julienschmidt/httprouter"
  "log"
  "encoding/json"
)

const allSections = `SELECT id, name, description
                     FROM section;`

func getSections(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
  db, err := sql.Open("mysql", "ian:password@/own_site_test")
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
    err := rows.Scan(&s.ID, &s.Name, &s.Description)
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
