package main

import (
  "database/sql" // for NullString
)

type Admin struct {
  Login string `json:"login"`
  PasswordHash uint32
}

type Section struct {
  ID string `json:"id"`
  Name string `json:"name"`
  Description string `json:"description"`
}

type Post struct {
  ID string `json:"id"`
  Title string `json:"title"`
  Text string `json:"text"`
  CreatedAt string `json:"created_at"`
  UpdatedAt string `json:"updated_at"`
  Visible bool `json:"visible"`
  SectionID string `json:"section_id"`
}

type Message struct {
  ID string `json:"id"`
  Theme string `json:"theme"`
  Telephone string `json:"telephone"`
  Email string `json:"email"`
  Text string `json:"text"`
  Name sql.NullString `json:"name"`
  CompanyName sql.NullString `json:"company_name"`
  OrderType string `json:"order_type"`
  CreatedAt string `json:"created_at"`
}
