package main

type Booking struct {
	BookingID         int    `json:"bookingid"`
	UserID            int    `json:"userId"`
	Title             string `json:"flight"`
	ImageURL          string `json:"imageUrl"`
	BadgeText         string `json:"badgeText"`
	DepartureTime     string `json:"departureTime"`
	ArrivalTime       string `json:"arrivalTime"`
	FlightClass       string `json:"flightClass"`
	DepartureAirport  string `json:"departureAirport"`
	DepartureDateTime string `json:"departureDateTime"`
	ArrivalAirport    string `json:"arrivalAirport"`
	ArrivalDateTime   string `json:"arrivalDateTime"`
	Passengers        int    `json:"passengers"`
	SeatNumbers       string `json:"seatNumbers"`
	Airline           string `json:"airline"`
	Airplane          string `json:"airplane"`
	Gate              string `json:"gate 1"`
	BookingStatus     string `json:"bookingStatus"`
}

type Passenger struct {
	Title       string `json:"title"`
	FirstName   string `json:"firstname"`
	LastName    string `json:"lastname"`
	PhoneNumber string `json:"phonenumber"`
	Email       string `json:"email"`
}

type MyEvent struct {
	UserID int `json:"UserID"`
	// OutboundFlightID int         `json:"OutboundFlightID"`
	// ReturnFlightID   int         `json:"ReturnFlightID"`

	Title             string `json:"flight"`
	ImageURL          string `json:"imageUrl"`
	BadgeText         string `json:"badgeText"`
	DepartureTime     string `json:"departureTime"`
	ArrivalTime       string `json:"arrivalTime"`
	FlightClass       string `json:"flightClass"`
	DepartureAirport  string `json:"departureAirport"`
	DepartureDateTime string `json:"departureDateTime"`
	ArrivalAirport    string `json:"arrivalAirport"`
	ArrivalDateTime   string `json:"arrivalDateTime"`

	Passengers  []Passenger `json:"passengers"`
	SeatNumbers string      `json:"Seatnumbers"`
	// Class            string      `json:"Class"`
	ExtraBaggage int `json:"ExtraBaggage"`
}

type response struct {
	StatusCode int               `json:"statusCode`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}

