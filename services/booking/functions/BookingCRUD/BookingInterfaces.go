package main

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