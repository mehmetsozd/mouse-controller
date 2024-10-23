package main

type MouseMoveData struct {
    Axis  AxisData `json:"axis"`
    Event string   `json:"event"`
}

type AxisData struct {
    X string `json:"x"`
    Y string `json:"y"`
}
