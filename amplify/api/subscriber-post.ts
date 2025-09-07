import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

const dynamoClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoClient);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Parse the request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
        },
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const contactData = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'emailAddress'];
    const missingFields = requiredFields.filter(field => !contactData[field]);
    
    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
        },
        body: JSON.stringify({ 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        })
      };
    }

    // Generate record ID
    const id = uuidv4();
    
    // Prepare the contact record
    const contactRecord = {
      id,
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      dateOfBirth: contactData.dateOfBirth,
      emailAddress: contactData.emailAddress,
      phoneNumber: contactData.phoneNumber || null,
      homeAddress: contactData.homeAddress || null,
      favoriteColor: contactData.favoriteColor || null
    };

    // Write to DynamoDB
    const tableName = process.env.CONTACTS_TABLE;
    if (!tableName) {
      throw new Error('CONTACTS_TABLE environment variable is not set');
    }

    await docClient.send(new PutCommand({
      TableName: tableName,
      Item: contactRecord
    }));

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
      },
      body: JSON.stringify({
        message: 'Contact created successfully',
        id: id,
        contact: contactRecord
      })
    };

  } catch (error) {
    console.error('Error creating contact:', error);
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
