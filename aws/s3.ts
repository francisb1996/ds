import { S3 } from 'aws-sdk'
import ProductResponse from '../domain/ProductResponse';
import TransactionRequest from '../domain/TransactionRequest';
import products from '../config/products';

const s3 = new S3()
const { BUCKET_NAME } = process.env

export const uploadRequest = async (resourceID: string, request: TransactionRequest) => {
    await s3.putObject({
        Bucket: BUCKET_NAME,
        Body: JSON.stringify(request),
        Key: `${resourceID}-request.json`
    }).promise()
    console.log('saved to s3')
};

export const getRequest = async (resourceID: string): Promise<TransactionRequest> => {
    const response = await s3.getObject({
        Bucket: BUCKET_NAME,
        Key: `${resourceID}-request.json`
    }).promise()
    console.log('got from s3')
    return JSON.parse(response.Body.toString()) as TransactionRequest
};

export const uploadProductResponse = async (resourceID: string, response: ProductResponse) => {
    console.log(`uploading ${resourceID}-${response.product}.json`)
    await s3.putObject({
        Bucket: BUCKET_NAME,
        Body: JSON.stringify(response),
        Key: `${resourceID}-${response.product}.json`
    }).promise()
    console.log('saved to s3')
};

export const getProductResponses = async (resourceID: string): Promise<ProductResponse[]> => {
    const productKeys: string[] = Array.from(products.keys())
    console.log(productKeys)
    const responses: ProductResponse[] = []
    for (const product of productKeys) {
        console.log(`getting ${resourceID}-${product}.json`)
        try {
            const response = await s3.getObject({
                Bucket: BUCKET_NAME, 
                Key: `${resourceID}-${product}.json`, 
            }).promise()
            if (response.Body) {
                responses.push(JSON.parse(response.Body.toString()) as ProductResponse)
            }
        } catch (e) {
            if (e.stausCode !== 404) {
                console.error(e)
            }
        }
    }
    console.log('got from s3', responses)
    return responses
};