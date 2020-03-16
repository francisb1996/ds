import ProductResponse from '../domain/ProductResponse';
import S3Record from '../domain/S3Record';
import IncomingEvidence from '../domain/IncomingEvidence';

export const save = async (request) => {
    console.log('saved to s3')
};

export const get = async (id: string): Promise<S3Record> => {
    console.log('getting from s3')
    return new S3Record([new IncomingEvidence('rxRulesOutput', 'xml', '<data />')])
};

export const update = async (product: ProductResponse) => {
    console.log('updating s3 record')
};