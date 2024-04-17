package main

import (
	"context"
	"fmt"

	"github.com/aws/aws-lambda-go/lambda"
)

type Booking struct {
	ID        int    `json:"id"`
	UserID    int    `json:"userId"`
	Flight    string `json:"flight"`
	Departure string `json:"departure"`
	Arrival   string `json:"arrival"`
}

var bookings = []Booking{
	{ID: 1, UserID: 1, Flight: "ABC123", Departure: "JFK", Arrival: "LAX"},
	{ID: 2, UserID: 1, Flight: "XYZ456", Departure: "LAX", Arrival: "JFK"},
	{ID: 3, UserID: 2, Flight: "DEF789", Departure: "SFO", Arrival: "ORD"},
}

type MyEvent struct {
	ID int `json:"id"`
	Name string `json:"name"`
}

// func HandleRequest(ctx context.Context, event *MyEvent) (*string, error) {
// 	if event == nil {
// 		return nil, fmt.Errorf("received nil event")
// 	}
// 	message := fmt.Sprintf("Hello %s!", event.Name)
// 	return &message, nil
// }

func HandleRequest(ctx context.Context, event *MyEvent) (*string, error) {
	return "hallo"
	// userID, err := stconv.Atoi(request.PathParameters["UserID"])
	// if err !=  nil {
	// 	log.Printf("Error parsing booking ID: %v", err)
	// 	return events.APIGatewayProxyResponse{StatusCode: http.StatusBadRequest}, nil
	// }
	// for _, booking := range bookings {
	// 	if booking.UserID == userID {
	// 		responseBody, err := json.Marshal(booking)
	// 		if err != nil {
	// 			log.Printf("Error marshalling JSON response: %v", err)
	// 			return events.APIGatewayProxyResponse{StatusCode: http.StatusInternalServerError}, err
	// 		}

	// 		return events.APIGatewayProxyResponse{
	// 			StatusCode: http.StatusOK,
	// 			Body:       string(responseBody),
	// 		}, nil
	// 	}
	// }

	// return events.APIGatewayProxyResponse{StatusCode: http.StatusNotFound}, nil
}

func main() {
	lambda.Start(HandleRequest)
	
}

// Router handles routing requests to the appropriate handler based on the path
// func router(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
// 	switch request.Path {
// 	case "/bookings/{UserID}":
// 		return getBookings(ctx, request)
// 	default:
// 		return events.APIGatewayProxyResponse{StatusCode: http.StatusNotFound}, nil
// 	}
// }
