import { Lambda } from "aws-sdk";
import { FunctionName } from "../domain/ProductConfig";

const lambda = new Lambda({
    endpoint: process.env.IS_LOCAL ? 'http://localhost:3002' : undefined
})

export const invoke = async (functionName: FunctionName, payload?: any): Promise<string> => {
    const response = await lambda.invoke({
        FunctionName: `ds-dev-${functionName}`,
        Payload: JSON.stringify(payload),
        InvocationType: 'RequestResponse'
    }).promise()
    return response.Payload.toString()
}
