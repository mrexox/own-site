package main

import (
  "net/http"
  "github.com/julienschmidt/httprouter"
)

const (
  port = ":7000"
)

func main() {
  router := httprouter.New()
  router.GET("/api/sections", getSections)
  router.GET("/api/section/:section_id", getPosts)
  router.GET("/api/posts", getPosts)

  
//  router.GET("api/admin/messages", getMessages) // requires authentication
  http.ListenAndServe(port, router)
}

func send(w http.ResponseWriter, jsn []byte) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Add("Access-Control-Allow-Origin", "*") // FIXME for my server requests only
	w.WriteHeader(http.StatusOK)
	w.Write(jsn)
}
