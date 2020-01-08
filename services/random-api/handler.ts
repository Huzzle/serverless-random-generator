import { SNS, DynamoDB } from 'aws-sdk'
import { SNSEvent, APIGatewayProxyResult } from 'aws-lambda'

const generateRandomNumber = async (): Promise<APIGatewayProxyResult> => {
  const sns = new SNS()
  const value: string = Math.floor(Math.random() * Math.floor(1000)).toString()

  const message: SNS.Types.PublishInput = {
    Message: value,
    TopicArn: process.env.VALUE_GENERATED_TOPIC_ARN as string,
  }

  await sns.publish(message).promise()

  return {
    statusCode: 200,
    body: value,
  }
}

const onValueGenerated = async (event: SNSEvent): Promise<void> => {
  const db = new DynamoDB()

  const item: DynamoDB.PutItemInput = {
    TableName: process.env.GENERATED_VALUES_TABLE_NAME as string,
    Item: {
      Value: { N: event.Records[0].Sns.Message }
    }
  }

  await db.putItem(item).promise()
}

const getGeneratedValues = async (): Promise<APIGatewayProxyResult> => {
  const db = new DynamoDB()

  const params: DynamoDB.ScanInput = {
    TableName: process.env.GENERATED_VALUES_TABLE_NAME as string,
  }

  const result: DynamoDB.ScanOutput = await db.scan(params).promise()

  const values: string = result.Items!.map(({ Value }) => Value.N).join(', ')

  return {
    statusCode: 200,
    body: values,
  }
}

export {
  generateRandomNumber,
  getGeneratedValues,
  onValueGenerated,
}
