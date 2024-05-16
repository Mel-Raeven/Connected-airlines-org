package main

import (
	"context"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
    "github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

func CreateBooking(event *MyEvent)(*string, error){

	dynamoClient := dynamodb.New(session.New())

	item := map[string]types.AttributeValue{
        "ID": &types.AttributeValueMemberS{Value: "1"},
        "Name": &types.AttributeValueMemberS{Value: "John Doe"},
        "Age": &types.AttributeValueMemberN{Value: "30"},
    }

    // Define input parameters for PutItem operation
    input := &dynamodb.PutItemInput{
        TableName: aws.String("YourDynamoDBTableName"),
        Item:      item,
    }

    // Perform PutItem operation
    _, err = client.PutItem(context.Background(), input)
    if err != nil {
        fmt.Println("Error putting item to DynamoDB:", err)
        os.Exit(1)
    }

}

func HandleRequest(ctx context.Context, event *MyEvent) ([]Booking, error) {
	var MyEvent []Booking
	return MyEvent, nil
}



func main() {
	lambda.Start(HandleRequest)
	
}
