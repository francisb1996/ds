import S3Record from '../domain/S3Record';
import { S3 } from 'aws-sdk'

const s3 = new S3()
const { BUCKET_NAME } = process.env

export const upload = async (resourceID: string, record: S3Record) => {
    await s3.putObject({
        Bucket: BUCKET_NAME,
        Body: JSON.stringify(record),
        Key: `${resourceID}.json`
    }).promise()
    console.log('saved to s3')
};

export const get = async (resourceID: string): Promise<S3Record> => {
    console.log('getting from s3', resourceID)
    const response = await s3.getObject({
        Bucket: BUCKET_NAME, 
        Key: `${resourceID}.json`, 
    }).promise()
    // y u no get here
    console.log('got from s3')
    return JSON.parse(response.Body.toString()) as S3Record
};