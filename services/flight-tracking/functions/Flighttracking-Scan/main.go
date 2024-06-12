package main

import (
	"context"
	"fmt"
    
    "encoding/json"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	
    "github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go/aws"
)

func ReadFlights(ctx context.Context, event *MyEvent) (response, error) {
	// load config
	cfg, err := config.LoadDefaultConfig(ctx)
	if err != nil {	
		return response{
					StatusCode: 500,
				}, err
	}

	//create dynamodb client
	client := dynamodb.NewFromConfig(cfg)

    
	//create scaninput that defines the conditions and tablename aswell as the expected returning fields
	input := &dynamodb.ScanInput{
        TableName:              aws.String("FlightTrackingDynamoDBTable"),
        ProjectionExpression: aws.String("FlightId, Long, Lat, Degree"),
    }

	//perform the scan
	fmt.Println("performing scan")
    result, err := client.Scan(ctx, input)
    if err != nil {
        fmt.Printf("Couldn't scan info for flight Here's why: %v\n", err)
        return response{
            StatusCode: 500,
        }, err
    }

	//create list of flights from results
    var flights []Flight
    err = attributevalue.UnmarshalListOfMaps(result.Items, &flights)
    if err != nil {
        fmt.Printf("Couldn't unmarshal scan response. Here's why: %v\n", err)
        return response{
            StatusCode: 500,
        }, err
    }

	//convert list to json
    flightlistJson, err := json.Marshal(flights)
	if err != nil {
		
		return response{
			StatusCode: 500,
		}, err
	}

	//put converted json in response
	fmt.Println("Returning list of flights")
	return response{
		StatusCode: 200,
		Headers: map[string]string{
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Allow-Headers": "*",
			"Content-Type":                 "application/json",
		},
		Body: string(flightlistJson),
	}, nil
    
}

func HandleRequest(ctx context.Context, event *MyEvent) (response, error) {
	
	return ReadFlights(ctx, event)
}

func main() {
	lambda.Start(HandleRequest)
}
