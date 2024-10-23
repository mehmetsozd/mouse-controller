package main

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func handleConnection(w http.ResponseWriter, r *http.Request) {
    log.Println("Client connected")
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Fatalf("Failed to upgrade to WebSocket: %v", err)
    }
    defer ws.Close()

    for {
        var msg MouseMoveData
        err := ws.ReadJSON(&msg)
        if err != nil {
            log.Printf("Failed to read JSON message: %v", err)
            break
        }

        log.Printf("Received message: %+v", msg) 
		handleEvent(msg)
    }
}
