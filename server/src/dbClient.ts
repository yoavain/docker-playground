import { DynamoDBClient, GetItemCommand, GetItemCommandOutput, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client: DynamoDBClient = new DynamoDBClient({ region: "us-east-1", endpoint: process.env.DYNAMO_URL });

export const getVisits = async (): Promise<number> => {
    const getItemCommand: GetItemCommand = new GetItemCommand({
        TableName: "visits",
        Key: {
            id: {
                N: "count"
            }
        }
    });
    const getResponse: GetItemCommandOutput = await client.send(getItemCommand);
    return Number(getResponse.Item.count.N) || 0;
}

export const incrementVisits = async () => {
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

    await client.send(putItemCommand);
};
