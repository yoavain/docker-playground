import type { GetItemCommandOutput, UpdateItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { CreateTableCommand, DynamoDBClient, GetItemCommand, ListTablesCommand, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client: DynamoDBClient = new DynamoDBClient({ region: "us-east-1", endpoint: process.env.DYNAMO_URL });

const CountRecordKey = "count";

export const initDb = async (TableName: string): Promise<void> => {
    try {
        console.log("Initializing db");
        const results = await client.send(new ListTablesCommand({}));
        if (!results.TableNames.includes(TableName)) {
            await client.send(new CreateTableCommand({
                TableName,
                KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
                AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
                ProvisionedThroughput: { ReadCapacityUnits: 10, WriteCapacityUnits: 10 }
            }));
            console.log("Table created");
        }
        else {
            console.log("Table already exists");
        }

        // Zero counter
        const putItemCommand = new PutItemCommand({
            TableName: TableName,
            Item: {
                id: {
                    S: CountRecordKey
                },
                [CountRecordKey]: {
                    N: "0"
                }
            }
        });
        await client.send(putItemCommand);
    }
    catch (err) {
        console.error(err);
    }
};

export const getVisits = async (TableName: string): Promise<number> => {
    console.log("In getVisits");
    const getItemCommand: GetItemCommand = new GetItemCommand({
        TableName: TableName,
        Key: {
            id: {
                S: CountRecordKey
            }
        }
    });
    console.log(`Sending GetItemCommand: ${JSON.stringify(getItemCommand)}`);
    const response: GetItemCommandOutput = await client.send(getItemCommand);
    console.log(JSON.stringify({ response }));
    return Number(response.Item?.[CountRecordKey]?.N) || 0;
};

export const incrementVisits = async (TableName: string): Promise<number> => {
    console.log("In incrementVisits");
    const updateItemCommand = new UpdateItemCommand({
        TableName: TableName,
        Key: {
            id: {
                S: CountRecordKey
            }
        },
        UpdateExpression: `SET ${CountRecordKey} = ${CountRecordKey} + :inc`,
        ExpressionAttributeValues: {
            ":inc": {
                N: "1"
            }
        },
        ReturnValues: "UPDATED_NEW"
    });

    console.log(`Sending UpdateItemCommand: ${JSON.stringify(updateItemCommand)}`);
    const response: UpdateItemCommandOutput = await client.send(updateItemCommand);
    return Number(response.Attributes?.[CountRecordKey]?.N) || 0;
};
