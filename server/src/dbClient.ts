import { DynamoDBClient, GetItemCommand, GetItemCommandOutput, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client: DynamoDBClient = new DynamoDBClient({ region: "us-east-1", endpoint: process.env.DYNAMO_URL });

export const getVisits = async (): Promise<number> => {
    console.log("In getVisits");
    const getItemCommand: GetItemCommand = new GetItemCommand({
        TableName: "visits",
        Key: {
            id: {
                N: "count"
            }
        }
    });
    console.log(`Sending GetItemCommand: ${JSON.stringify(getItemCommand)}`);
    const response: GetItemCommandOutput = await client.send(getItemCommand);
    console.log(JSON.stringify({ response }));
    return Number(response.Item?.count?.N) || 0;
}

export const incrementVisits = async () => {
    console.log("In incrementVisits");
    const count: number = await getVisits();

    const putItemCommand = new PutItemCommand({
        TableName: "visits",
        Item: {
            id: {
                N: "count"
            },
            count: {
                N: (count + 1).toString()
            }
        }
    });

    console.log(`Sending PutItemCommand: ${JSON.stringify(putItemCommand)}`);
    await client.send(putItemCommand);
};
