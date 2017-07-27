package main

import (
  "database/sql"
  _ "github.com/go-sql-driver/mysql"
  "net/http"
  "github.com/julienschmidt/httprouter"
  "log"
  "encoding/json"
)

// SQL Queries
const (
  allPosts = `SELECT id, title, description, content, visible, created_at, updated_at, section_id
              FROM post;`
  postByID = `SELECT id, title, description, content, visible, created_at, updated_at, section_id
              FROM post
              WHERE id = ?;`
  postsBySectionID = `SELECT id, title, description, content, visible, created_at, updated_at, section_id
                      FROM post
                      WHERE section_id = ?;`
)


// Returns all posts in a database
func getPosts(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
  db, err := sql.Open("mysql", "ian:password@/own_site_test")
  if err != nil {
    log.Fatal(err)
    return
  }
  defer db.Close()

  var rows *sql.Rows
  sectionID := params.ByName("section_id")
  if len(sectionID) != 0 {
    rows, err = db.Query(postsBySectionID, sectionID)
  } else {
    rows, err = db.Query(allPosts)
  }
  if err != nil {
    log.Println("Error while quering all posts.")
    log.Fatal(err)
    return
  }

  var posts []Post
  for rows.Next() {
    var p Post
    err := rows.Scan(&p.ID, &p.Title, &p.Description, &p.Text, &p.Visible, &p.CreatedAt, &p.UpdatedAt, &p.SectionID)
    if err != nil {
      log.Println("Error while scanning rows into Post struct.")
      log.Fatal(err)
      return
    }
    posts = append(posts, p)
  }

  jsn, err := json.Marshal(posts)
  send(w, jsn)
}
