package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/aws/aws-sdk-go/aws"
)

func ReadBookingsByUserID(ctx context.Context, event *MyEvent) (response, error) {
	// load config
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return response{
			StatusCode: 500,
		}, err
	}

	// create dynamodb client
	client := dynamodb.NewFromConfig(cfg)

	// convert the UserID into string so it can be used in the scaninput
	strUserID := strconv.Itoa(event.UserID)

	// create scaninput that defines the conditions and tablename aswell as the expected returning fields
	input := &dynamodb.ScanInput{
		TableName:        aws.String("BookingDynamoDBTable"),
		FilterExpression: aws.String("UserID = :userid"),
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":userid": &types.AttributeValueMemberN{Value: strUserID},
		},
		ProjectionExpression: aws.String("BookingID, Title, ImageURL, BadgeText, DepartureTime, ArrivalTime, FlightClass, DepartureAirport, DepartureDatetime, ArrivalAirport,ArrivalDateTime, Passengers, SeatNumbers, Airline, Airplane, Gate, BookingStatus"),
	}

	// perform the scan
	result, err := client.Scan(ctx, input)
	if err != nil {
		fmt.Printf("Couldn't scan info for user %v. Here's why: %v\n", event.UserID, err)
		return response{
			StatusCode: 500,
		}, err
	}

	if len(result.Items) == 0 {
		fmt.Printf("No bookings found for user %v\n", event.UserID)
		return response{
			StatusCode: 200,
			Headers: map[string]string{
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "*",
				"Access-Control-Allow-Headers": "*",
				"Content-Type":                 "application/json",
			},
			Body: "",
		}, nil
	}

	// create list of bookings from results
	var bookings []Booking
	err = attributevalue.UnmarshalListOfMaps(result.Items, &bookings)
	if err != nil {
		fmt.Printf("Couldn't unmarshal scan response. Here's why: %v\n", err)
		return response{
			StatusCode: 500,
		}, err
	}

	// convert list to json
	bookinglistJson, err := json.Marshal(bookings)
	if err != nil {
		return response{
			StatusCode: 500,
		}, err
	}

	// put converted json in response
	fmt.Printf("Returning list of bookings")
	return response{
		StatusCode: 200,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
			"Content-Type":                 "application/json",
		},
		Body: string(bookinglistJson),
	}, nil
}

func HandleRequest(ctx context.Context, event *MyEvent) (response, error) {
	Response, err := ReadBookingsByUserID(ctx, event)
	if err != nil {
		return response{
			StatusCode: 500,
		}, err
	}
	return Response, nil
}

func main() {
	lambda.Start(HandleRequest)
}
