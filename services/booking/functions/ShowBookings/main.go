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
	Passengers        int    `json:"passengers"`
	SeatNumbers       string `json:"seatNumbers"`
	Airline           string `json:"airline"`
	Airplane          string `json:"airplane"`
	Gate              string `json:"gate 1"`
	Status            string `json:"status"`
}

var bookings = []Booking{
	{
		BookingID:         1,
		UserID:            1,
		Title:             "Mallorca",
		ImageURL:          "",
		BadgeText:         "9 Days",
		DepartureTime:     "10:00 AM",
		ArrivalTime:       "12:00 PM",
		Class:             "Business",
		DepartureAirport:  "Airport 1",
		DepartureDateTime: "13:00 1-1-2024",
		ArrivalAirport:    "Airport 2",
		ArrivalDateTime:   "15:00 1-1-2024",
		Passengers:        2,
		SeatNumbers:       "23B, 24B",
		Airline:           "Transavia",
		Airplane:          "Airbus A330-200",
		Gate:              "Gate 1",
		Status:            "Confirmed",
	},
	{
		BookingID:         2,
		UserID:            2,
		Title:             "Barcelona",
		ImageURL:          "",
		BadgeText:         "7 Days",
		DepartureTime:     "09:00 AM",
		ArrivalTime:       "11:00 AM",
		Class:             "Economy",
		DepartureAirport:  "Airport 3",
		DepartureDateTime: "11:00 3-1-2024",
		ArrivalAirport:    "Airport 4",
		ArrivalDateTime:   "15:00 1-1-2024",
		Passengers:        1,
		SeatNumbers:       "15C",
		Airline:           "Iberia",
		Airplane:          "Boeing 737",
		Gate:              "Gate 2",
		Status:            "Confirmed",
	},
	{
		BookingID:         3,
		UserID:            2,
		Title:             "Paris",
		ImageURL:          "",
		BadgeText:         "28 Days",
		DepartureTime:     "9:00 AM",
		ArrivalTime:       "2:00 PM",
		Class:             "Business",
		DepartureAirport:  "Airport 5",
		DepartureDateTime: "10:00 1-1-2024",
		ArrivalAirport:    "Airport 6",
		ArrivalDateTime:   "15:00 1-1-2024",
		Passengers:        3,
		SeatNumbers:       "26C, 27C, 28C",
		Airline:           "Air France",
		Airplane:          "Airbus A380",
		Gate:              "Gate 3",
		Status:            "Confirmed",
	},
	{
		BookingID:         4,
		UserID:            2,
		Title:             "London",
		ImageURL:          "",
		BadgeText:         "10 Days",
		DepartureTime:     "11:00 AM",
		ArrivalTime:       "1:00 PM",
		Class:             "Economy",
		DepartureAirport:  "Airport 7",
		DepartureDateTime: "12:00 1-1-2024",
		ArrivalAirport:    "Airport 8",
		ArrivalDateTime:   "14:00 1-1-2024",
		Passengers:        1,
		SeatNumbers:       "29D",
		Airline:           "British Airways",
		Airplane:          "Boeing 777",
		Gate:              "Gate 4",
		Status:            "Confirmed",
	},
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

type response struct {
	StatusCode int               `json:"statusCode`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}

func HandleRequest(ctx context.Context, event *MyEvent) (response, error) {
	bookinglist := []Booking{}
	for _, booking := range bookings {
		if booking.UserID == event.UserID {
			bookinglist = append(bookinglist, booking)
		}
	}

	Json, err := json.Marshal(bookinglist)
	if err != nil {
		log.Panicf("error: %v", err)
		return response{
			StatusCode: 500,
		}, err
	}

	log.Printf("Returning list of bookings")
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