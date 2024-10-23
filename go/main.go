package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/ws", handleConnection)

	log.Println("Server started on 192.168.1.15:8080")
	err := http.ListenAndServe("192.168.1.15:8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
