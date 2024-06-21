package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/aws/aws-sdk-go/service/eventbridge"
)

// Handler is the Lambda function handler
func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// Log the received request for debugging
	fmt.Printf("Received request: %+v\n", request)

	// Retrieve the username from the request body
	var requestBody map[string]string
	if err := json.Unmarshal([]byte(request.Body), &requestBody); err != nil {
		fmt.Println("Error parsing request body:", err)
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Bad Request: Invalid request body"}, nil
	}
	username := requestBody["username"]

	// Delete the user from Cognito
	err := deleteUser(username)
	if err != nil {
		fmt.Println("Error deleting user:", err)
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Internal Server Error: Could not delete user"}, nil
	}

	// Emit event to notify other services
	err = emitUserDeletedEvent(username)
	if err != nil {
		fmt.Println("Error emitting user deleted event:", err)
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Internal Server Error: Could not emit user deleted event"}, nil
	}

	return events.APIGatewayProxyResponse{StatusCode: 200, Body: "User deleted successfully"}, nil
}

// deleteUser deletes the user from Amazon Cognito
func deleteUser(username string) error {
	sess := session.Must(session.NewSession())
	cognitoIDP := cognitoidentityprovider.New(sess)

	input := &cognitoidentityprovider.AdminDeleteUserInput{
		UserPoolId: aws.String("eu-central-1_jxDOI0O8D"), // Replace with your User Pool ID
		Username:   aws.String(username),
	}

	_, err := cognitoIDP.AdminDeleteUser(input)
	if err != nil {
		fmt.Printf("Error from cognitoIDP.AdminDeleteUser: %s\n", err.Error())
		return err
	}

	return nil
}

// emitUserDeletedEvent emits an event to notify other services that a user has been deleted
func emitUserDeletedEvent(username string) error {
	eventBridgeClient := eventbridge.New(session.New())

	eventData := map[string]interface{}{
		"UserID": username,
	}

	jsonData, err := json.Marshal(eventData)
	if err != nil {
		return err
	}

	eventInput := &eventbridge.PutEventsInput{
		Entries: []*eventbridge.PutEventsRequestEntry{
			{
				Source:       aws.String("com.example.kwetter"),
				Detail:       aws.String(string(jsonData)),
				DetailType:   aws.String("DeleteUser"),
				EventBusName: aws.String("KwetterEventBus"),
			},
		},
	}

	_, putEventErr := eventBridgeClient.PutEvents(eventInput)
	if putEventErr != nil {
		return putEventErr
	}
	return nil
}

func main() {
	lambda.Start(Handler)
}
