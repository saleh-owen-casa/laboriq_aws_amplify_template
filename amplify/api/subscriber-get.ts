import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Get the id query parameter
    const id = event.queryStringParameters?.id;
    
    if (!id) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
        },
        body: JSON.stringify({ error: 'id query parameter is required' })
      };
    }

    // Get the table name from environment
    const tableName = process.env.CONTACTS_TABLE;
    if (!tableName) {
      throw new Error('CONTACTS_TABLE environment variable is not set');
    }

    // Query DynamoDB
    const result = await docClient.send(new GetCommand({
      TableName: tableName,
      Key: {
        id: id
      }
    }));

    if (!result.Item) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
        },
        body: JSON.stringify({ error: 'Contact not found' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
      },
      body: JSON.stringify(result.Item)
    };

  } catch (error) {
    console.error('Error fetching contact:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
