import TransactionData from '../domain/TransactionData';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient()
const { TABLE_NAME } = process.env

export async function save(data: TransactionData) {
    console.log('saved to dynamo')
    await dynamoDb.put({
        TableName: TABLE_NAME,
        Item: data
    }).promise()
};

export async function get(resourceID: string): Promise<TransactionData> {
    console.log('getting from dynamo')
    const response =  await dynamoDb.get({
        TableName: TABLE_NAME,
        Key: { resourceID }
    }).promise()
    return response.Item as TransactionData
};