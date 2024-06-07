package main

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/cloudformation"
	"github.com/aws/aws-sdk-go-v2/service/lambda"
)

type MyEvent struct {
	UserID int `json:"userID"`
}

type Booking struct {
	BookingID         int    `json:"BookingID"`
	Title             string `json:"Title"`
	ImageURL          string `json:"ImageURL"`
	BadgeText         string `json:"BadgeText"`
	DepartureTime     string `json:"DepartureTime"`
	ArrivalTime       string `json:"ArrivalTime"`
	FlightClass       string `json:"FlightClass"`
	DepartureAirport  string `json:"DepartureAirport"`
	DepartureDatetime string `json:"DepartureDatetime"`
	ArrivalAirport    string `json:"ArrivalAirport"`
	ArrivalDateTime   string `json:"ArrivalDateTime"`
	Passengers        int    `json:"Passengers"`
	SeatNumbers       string `json:"SeatNumbers"`
	Airline           string `json:"Airline"`
	Airplane          string `json:"Airplane"`
	Gate              string `json:"Gate"`
	BookingStatus     string `json:"BookingStatus"`
}

type Response struct {
	StatusCode int               `json:"statusCode"`
	Headers    map[string]string `json:"headers"`
	Body       string            `json:"body"`
}

// getLambdaFunctionPhysicalID retrieves the physical ID of the Lambda function from the CloudFormation stack
func getLambdaFunctionPhysicalID(ctx context.Context, cfg aws.Config, stackName, logicalID string) (string, error) {
	cfnClient := cloudformation.NewFromConfig(cfg)

	describeStacksInput := &cloudformation.DescribeStackResourcesInput{
		StackName: aws.String(stackName),
	}

	result, err := cfnClient.DescribeStackResources(ctx, describeStacksInput)
	if err != nil {
		return "", err
	}

	for _, resource := range result.StackResources {
		if *resource.LogicalResourceId == logicalID {
			return *resource.PhysicalResourceId, nil
		}
	}

	return "", nil
}

func TestInvokeLambdaFunction(t *testing.T) {
	ctx := context.Background()

	// Load the AWS configuration
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		t.Fatalf("Unable to load SDK config, %v", err)
	}

	// Retrieve the physical ID of the Lambda function
	stackName := "connected-airlines"  // CloudFormation stack name
	logicalID := "GetBookingsFunction" // Logical ID of the Lambda function in the stack
	lambdaFunctionName, err := getLambdaFunctionPhysicalID(ctx, cfg, stackName, logicalID)
	if err != nil {
		t.Fatalf("Failed to get Lambda function physical ID: %v", err)
	}

	// Create a Lambda client
	svc := lambda.NewFromConfig(cfg)

	// Define the event to send to the Lambda function
	event := MyEvent{UserID: 1}
	eventBytes, err := json.Marshal(event)
	if err != nil {
		t.Fatalf("Failed to marshal event: %v", err)
	}

	// Invoke the Lambda function
	input := &lambda.InvokeInput{
		FunctionName: aws.String(lambdaFunctionName), // Use the physical name of your Lambda function
		Payload:      eventBytes,
	}

	result, err := svc.Invoke(ctx, input)
	if err != nil {
		t.Fatalf("Failed to invoke Lambda function: %v", err)
	}

	// Handle the payload
	var lambdaResp Response
	err = json.Unmarshal(result.Payload, &lambdaResp)
	if err != nil {
		t.Fatalf("Failed to unmarshal Lambda response: %v", err)
	}

	if lambdaResp.StatusCode != 200 {
		t.Fatalf("Expected status code 200 in Lambda response, got %d", lambdaResp.StatusCode)
	}

	t.Logf("Lambda response headers: %v", lambdaResp.Headers)
	t.Logf("Lambda response body: %s", lambdaResp.Body)

	// Optionally, you can unmarshal the Body if it contains a JSON array of bookings
	var bookings []Booking
	err = json.Unmarshal([]byte(lambdaResp.Body), &bookings)
	if err != nil {
		t.Fatalf("Failed to unmarshal bookings: %v", err)
	}

	// Check that the bookings are as expected
	t.Logf("Bookings: %v", bookings)
}
