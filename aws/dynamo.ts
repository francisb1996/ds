import ProductResponse from '../domain/ProductResponse';
import { v4 } from 'uuid'
import TransactionData from '../domain/TransactionData';

export const save = async (request) => {
    console.log('saved to dynamo')
    return v4()
};

export const get = async (resouceID: string): Promise<TransactionData> => {
    console.log('getting from dynamo')
    return new TransactionData(resouceID)
};

export const update = async (product: ProductResponse) => {
    console.log('updating dynamo record')
};