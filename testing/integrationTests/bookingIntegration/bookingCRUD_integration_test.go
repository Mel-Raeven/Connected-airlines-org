package main

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/lambda"
)

type BookingCRUDEvent struct {
	UserID int `json:"userID"`
}

func TestBookingCRUDIntegration(t *testing.T) {
	ctx := context.Background()

	// Load the AWS configuration
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {
		t.Fatalf("Unable to load SDK config, %v", err)
	}

	// Create a Lambda client
	svc := lambda.NewFromConfig(cfg)

	// Define the event to send to the Lambda function
	event := BookingCRUDEvent{UserID: 1}
	eventBytes, err := json.Marshal(event)
	if err != nil {
		t.Fatalf("Failed to marshal event: %v", err)
	}

	// Invoke the Lambda function
	input := &lambda.InvokeInput{
		FunctionName: aws.String("connected-airlines-BookingCRUD-FuQlcDcQjQx5"), // Use the physical name of your Lambda function
		Payload:      eventBytes,
	}

	result, err := svc.Invoke(ctx, input)
	if err != nil {
		t.Fatalf("Failed to invoke Lambda function: %v", err)
	}

	// Check the payload
	if len(result.Payload) == 0 {
		t.Log("Lambda function executed successfully with no payload")
		return
	}

	// Check if the payload is 'null'
	var payload interface{}
	err = json.Unmarshal(result.Payload, &payload)
	if err != nil {
		t.Fatalf("Failed to unmarshal Lambda response: %v", err)
	}

	if payload != nil {
		t.Fatalf("Expected 'null' payload, got %v", payload)
	}

	t.Log("Lambda function executed successfully with 'null' payload")
}
