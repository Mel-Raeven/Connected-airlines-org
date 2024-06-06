package main

import (
	"context"
	"fmt"
	"os"
	"math/rand"
    "time"
	"strconv"
	

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/aws/aws-sdk-go/aws"
)

func GenerateflightData(ctx context.Context) error {
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		return err
	}

	client := dynamodb.NewFromConfig(cfg)

	fmt.Println("generating random flight data")
	// Seed the random number generator to produce different results each time
    rand.Seed(time.Now().UnixNano())
	min := -90.0
    max := 90.0

	randomlong := min + rand.Float64()*(max-min)
	randomlat := min + rand.Float64()*(max-min)
	randomdegree := rand.Intn(360)

	item := map[string]types.AttributeValue{
		"FlightId": &types.AttributeValueMemberS{Value: "1"},
		"Long":     &types.AttributeValueMemberN{Value: fmt.Sprintf("%f", randomlong)},
		"Lat":      &types.AttributeValueMemberN{Value: fmt.Sprintf("%f", randomlat)},
		"degree":      &types.AttributeValueMemberN{Value: strconv.Itoa(randomdegree)},
	}

	// Define input parameters for PutItem operation
	input := &dynamodb.PutItemInput{
		TableName: aws.String("FlightTrackingDynamoDBTable"),
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

func HandleRequest(ctx context.Context, event *MyEvent) error {
	
	return GenerateflightData(ctx)
}

func main() {
	lambda.Start(HandleRequest)
}
