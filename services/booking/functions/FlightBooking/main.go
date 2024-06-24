package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)


func HandleRequest(ctx context.Context, event *MyEvent) error {
	// load config
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return err
	}

	client := dynamodb.NewFromConfig(cfg)

	passengers := make([]types.AttributeValue, len(event.Passengers))
	for i, passenger := range event.Passengers {
		passengers[i] = &types.AttributeValueMemberM{Value: map[string]types.AttributeValue{
			"title":       &types.AttributeValueMemberS{Value: passenger.Title},
			"firstname":   &types.AttributeValueMemberS{Value: passenger.FirstName},
			"lastname":    &types.AttributeValueMemberS{Value: passenger.LastName},
			"phonenumber": &types.AttributeValueMemberS{Value: passenger.PhoneNumber},
			"email":       &types.AttributeValueMemberS{Value: passenger.Email},
		}}
	}

	item := map[string]types.AttributeValue{
		"OutboundFlightID": &types.AttributeValueMemberN{Value: fmt.Sprintf("%d", event.OutboundFlightID)},
		"UserID":           &types.AttributeValueMemberN{Value: fmt.Sprintf("%d", event.UserID)},
		"ReturnFlightID":   &types.AttributeValueMemberN{Value: fmt.Sprintf("%d", event.ReturnFlightID)},
		"passengers":       &types.AttributeValueMemberL{Value: passengers},
		"Seatnumbers":      &types.AttributeValueMemberS{Value: event.SeatNumbers},
		"Class":            &types.AttributeValueMemberS{Value: event.Class},
		"ExtraBaggage":     &types.AttributeValueMemberN{Value: fmt.Sprintf("%d", event.ExtraBaggage)},
	}

	// Define input parameters for PutItem operation
	input := &dynamodb.PutItemInput{
		TableName: aws.String("BookingDynamoDBTable"),
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

func main() {
	lambda.Start(HandleRequest)
}