package main

type Flight struct {
	FlightID       	int     `json:"flightId"`
	Long            float64 `json:"long"`
	Lat             float64 `json:"lat"`
	Degree          int `json:"degree"`
}

type MyEvent struct {
	FlightId		int		`json:"flightid"`
}

type response struct {
	StatusCode int               `json:"statusCode`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}