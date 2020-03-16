import { SQS } from 'aws-sdk'
import ProductUpdate from '../domain/ProductUpdate';

export const updateTransaction = async (update: ProductUpdate) => {
    const sqs = new SQS()
    const { SQS_URL, IS_LOCAL } = process.env
    if (!IS_LOCAL) {
        await sqs.sendMessage({
            QueueUrl: SQS_URL,
            MessageBody: JSON.stringify(update),
            MessageGroupId: Date.now().toString(),
        }).promise()
        console.log('message sent to sqs')
    } else {
        console.log('sqs message would be sent here - not supported localy')
    }
};