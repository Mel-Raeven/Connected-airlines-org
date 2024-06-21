package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/google/uuid"
)

type Detail struct {
	RequestingAirline struct {
		CompanyName string `json:"CompanyName"`
		KVK         string `json:"KVK"`
	} `json:"RequestingAirline"`
	PassengerInfo struct {
		Title       string `json:"Title"`
		FirstName   string `json:"FirstName"`
		MiddleName  string `json:"MiddleName"`
		LastName    string `json:"LastName"`
		PhoneNumber string `json:"PhoneNumber"`
		Email       string `json:"Email"`
	} `json:"PassengerInfo"`
	FlightInfo struct {
		Class             string `json:"Class"`
		DepartureAirport  string `json:"DepartureAirport"`
		DepartureDateTime string `json:"DepartureDateTime"`
		ArrivalAirport    string `json:"ArrivalAirport"`
		ArrivalDateTime   string `json:"ArrivalDateTime"`
		CarryonBaggage    string `json:"CarryonBaggage"`
		HoldBaggage       string `json:"HoldBaggage"`
	} `json:"FlightInfo"`
	FlightCost string `json:"FlightCost"`
}

type Event struct {
	Source     string `json:"source"`
	Detail     Detail `json:"detail"`
	DetailType string `json:"detailType"`
}

func GenerateUUID() string {
	return uuid.New().String()
}

func StoreReceivedBooking(ctx context.Context, event *Event) error {
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return err
	}

	client := dynamodb.NewFromConfig(cfg)

	item := map[string]types.AttributeValue{
		"GUID":              &types.AttributeValueMemberS{Value: GenerateUUID()},
		"CompanyName":       &types.AttributeValueMemberS{Value: event.Detail.RequestingAirline.CompanyName},
		"KVK":               &types.AttributeValueMemberS{Value: event.Detail.RequestingAirline.KVK},
		"Title":             &types.AttributeValueMemberS{Value: event.Detail.PassengerInfo.Title},
		"FirstName":         &types.AttributeValueMemberS{Value: event.Detail.PassengerInfo.FirstName},
		"MiddleName":        &types.AttributeValueMemberS{Value: event.Detail.PassengerInfo.MiddleName},
		"LastName":          &types.AttributeValueMemberS{Value: event.Detail.PassengerInfo.LastName},
		"PhoneNumber":       &types.AttributeValueMemberS{Value: event.Detail.PassengerInfo.PhoneNumber},
		"Email":             &types.AttributeValueMemberS{Value: event.Detail.PassengerInfo.Email},
		"Class":             &types.AttributeValueMemberS{Value: event.Detail.FlightInfo.Class},
		"DepartureAirport":  &types.AttributeValueMemberS{Value: event.Detail.FlightInfo.DepartureAirport},
		"DepartureDateTime": &types.AttributeValueMemberS{Value: event.Detail.FlightInfo.DepartureDateTime},
		"ArrivalAirport":    &types.AttributeValueMemberS{Value: event.Detail.FlightInfo.ArrivalAirport},
		"ArrivalDateTime":   &types.AttributeValueMemberS{Value: event.Detail.FlightInfo.ArrivalDateTime},
		"CarryonBaggage":    &types.AttributeValueMemberS{Value: event.Detail.FlightInfo.CarryonBaggage},
		"HoldBaggage":       &types.AttributeValueMemberS{Value: event.Detail.FlightInfo.HoldBaggage},
		"FlightCost":        &types.AttributeValueMemberS{Value: event.Detail.FlightCost},
	}

	// Define input parameters for PutItem operation
	input := &dynamodb.PutItemInput{
		TableName: aws.String("ReceiveBookingDynamoDBTable"),
		Item:      item,
	}

	// Perform PutItem operation
	fmt.Println("inserting flight data")
	_, err = client.PutItem(context.Background(), input)
	if err != nil {
		fmt.Println("Error putting item to DynamoDB:", err)
		os.Exit(1)
	}
	return nil
}

func HandleRequest(ctx context.Context, event *Event) error {
	return StoreReceivedBooking(ctx, event)
}

func main() {
	lambda.Start(HandleRequest)
}
