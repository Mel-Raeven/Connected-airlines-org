package main

import (
	"context"
	"encoding/json"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/eventbridge"
)

type Booking struct {
	BookingID         int    `json:"bookingid"`
	UserID            int    `json:"userId"`
	Title             string `json:"flight"`
	ImageURL          string `json:"imageUrl"`
	BadgeText         string `json:"badgeText"`
	DepartureTime     string `json:"departureTime"`
	ArrivalTime       string `json:"arrivalTime"`
	Class             string `json:"class"`
	DepartureAirport  string `json:"departureAirport"`
	DepartureDateTime string `json:"departureDateTime"`
	ArrivalAirport    string `json:"arrivalAirport"`
	ArrivalDateTime   string `json:"arrivalDateTime"`
	Passengers        []passanger  `json:"passengers"`
	SeatNumbers       string `json:"seatNumbers"`
	Airline           string `json:"airline"`
	Airplane          string `json:"airplane"`
	Gate              string `json:"gate 1"`
	Status            string `json:"status"`
}

type Passenger struct {
    Title       string `json:"title"`
    FirstName   string `json:"firstname"`
    LastName    string `json:"lastname"`
    PhoneNumber string `json:"phonenumber"`
    Email       string `json:"email"`
}

type MyEvent struct {
	OutboundFlightID int         `json:"OutboundFlightID"`
    UserID           int         `json:"UserID"`
    ReturnFlightID   int         `json:"ReturnFlightID"`
    Passengers       []Passenger `json:"passengers"`
    SeatNumbers      string      `json:"Seatnumbers"`
    Class            string      `json:"Class"`
    ExtraBaggage     int         `json:"ExtraBaggage"`
}

// func createEventBridgeClient() *eventbridge.EventBridge {
//     // Create a new session with your AWS credentials
//     sess := session.Must(session.NewSessionWithOptions(session.Options{
//         SharedConfigState: session.SharedConfigEnable,
//     }))
    
//     // Create an EventBridge client using the session
//     svc := eventbridge.New(sess)
    
//     return svc
// }

func HandleRequest(ctx context.Context, event *MyEvent) (response, error) {
	//recieve event
	if event == nil {
        return nil, fmt.Errorf("received nil event")
    }


	
	//get flight from other services

	//
    
    

	//save booking with new passengers id's 
	
}

func main() {
	lambda.Start(HandleRequest)
}