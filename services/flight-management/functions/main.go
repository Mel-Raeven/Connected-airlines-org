package main

import (
	"context"
	"encoding/json"

	"github.com/aws/aws-lambda-go/lambda"
)

type Flight struct {
	name                  string
	ExpectedDepartureTime string
	ExpectedArrivalTime   string
	PointOfDeparture      string
	Destination           string
	Plane                 Plane
	Weight                int64
	Pending               bool
	FlightCrew            []Employee
	NeedOfFuel            int64
	SeatCost              float64
}

type Employee struct {
	Name string
	Jobs []Job
}

type Job struct {
	// Job properties
}

type Plane struct {
	ID              string
	Geolocation     string
	Status          string
	MaxWeight       int64
	Weight          int64
	LitersOfFuel    int64
	MaxLitersOfFuel int64
	TotalSeats      []Seat
	NeededPilots    int
}

type Seat struct {
	Row    string
	Number int
}

func createMockFlight(tripname string, departure, destination string) Flight {
	return Flight{
		name:                  tripname,
		ExpectedDepartureTime: "2024-04-18T08:00:00Z",
		ExpectedArrivalTime:   "2024-04-18T11:00:00Z",
		PointOfDeparture:      departure,
		Destination:           destination,
		Plane: Plane{
			ID:          "ABC123",
			Geolocation: "Some location",
			Status:      "ready for departure",
		},
		Weight:     50000,
		Pending:    false,
		FlightCrew: []Employee{},
		NeedOfFuel: 10000,
		SeatCost:   500.00,
	}
}

type MyEvent struct {
	SearchCriteria FlightSearchCriteria `json:"searchCriteria"`
}

type FlightSearchCriteria struct {
	PointOfDeparture string `json:"departureCity"`
	Destination      string `json:"destinationCity"`
}

func searchFlights(criteria FlightSearchCriteria) []Flight {
	flights := []Flight{
		createMockFlight("Round Trip", "MIA", "LAX"),
		createMockFlight("One Way Ticket", "MIA", "JFK"),
		createMockFlight("City Trip", "JFK", "LAX"),
		createMockFlight("Round Trip", "LHR", "CDG"),
	}

	var filteredFlights []Flight
	for _, flight := range flights {
		if (flight.PointOfDeparture == criteria.PointOfDeparture || criteria.PointOfDeparture == "") && (flight.Destination == criteria.Destination || criteria.Destination == "") {
			filteredFlights = append(filteredFlights, flight)
		}
	}

	return filteredFlights
}

type response struct {
	StatusCode int               `json:"statusCode`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}

func HandleRequest(ctx context.Context, event *MyEvent) (response, error) {
	flights := searchFlights(event.SearchCriteria)

	Json, err := json.Marshal(flights)
	if err != nil {
		panic(err)
	}

	return response{
		StatusCode: 200,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
			"Content-Type":                 "application/json",
		},
		Body: string(Json),
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
