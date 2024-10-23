package main

import (
	"log"
	"strconv"

	"github.com/go-vgo/robotgo"
)

func moveMouse(x, y float64) {
    scaleFactor := 1500.0 
    xScaled := x * scaleFactor
    yScaled := y * scaleFactor

    currentX, currentY := robotgo.GetMousePos()
    newX := currentX + int(xScaled)
    newY := currentY + int(yScaled)

    log.Printf("Moving mouse from (%d, %d) to (%d, %d)", currentX, currentY, newX, newY)
    robotgo.Move(newX, newY)
}

func clickMouse(button string) {
    if button == "right" {
        robotgo.MouseClick("right", false) 
    } else if button == "left" {
        robotgo.MouseClick("left", false)
    }
}

func handleEvent(msg MouseMoveData) {
    log.Printf("Received message: %+v", msg)

    switch msg.Event {
    case "MouseMotionMove":
        x, errX := strconv.ParseFloat(msg.Axis.X, 64)
        y, errY := strconv.ParseFloat(msg.Axis.Y, 64)
        if errX != nil || errY != nil {
            log.Printf("Error converting axis values: %v %v", errX, errY)
            return
        }
        log.Printf("Moving mouse by X: %f, Y: %f", x, y)
        moveMouse(x, y)
    case "rightClickEvent":
        log.Printf("Right click event triggered")
        clickMouse("right")
    case "leftClickEvent":
        log.Printf("Left click event triggered")
        clickMouse("left")
    default:
        log.Printf("Event: %s", msg.Event)
    }
}
