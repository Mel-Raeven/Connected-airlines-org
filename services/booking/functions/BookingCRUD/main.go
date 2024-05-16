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
)

func CreateBooking(ctx context.Context, event *MyEvent) error {
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return err
	}

	client := dynamodb.NewFromConfig(cfg)

	item := map[string]types.AttributeValue{
		"FlightId": &types.AttributeValueMemberS{Value: "1"},
		"Name":     &types.AttributeValueMemberS{Value: "John Doe"},
		"Age":      &types.AttributeValueMemberN{Value: "30"},
	}

	// Define input parameters for PutItem operation
	input := &dynamodb.PutItemInput{
		TableName: aws.String("FlightManagementDynamoDBTable"),
		Item:      item,
	}

	// Perform PutItem operation
	_, err = client.PutItem(context.Background(), input)
	if err != nil {
		fmt.Println("Error putting item to DynamoDB:", err)
		os.Exit(1)
	}
	return nil
}

func HandleRequest(ctx context.Context, event *MyEvent) error {
	CreateBooking(ctx, event)
	return nil
}

func main() {
	lambda.Start(HandleRequest)
}
