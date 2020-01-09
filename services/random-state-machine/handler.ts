import { StepFunctions } from 'aws-sdk'
import { SQSEvent } from 'aws-lambda'

interface GenerateRandomNumberInput {
  threshold: number
  max: number
}

interface WaitForTaskTokenSQSMessageBody {
  Message: string | number
  TaskToken: string
}

class WrongRandomNumber extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'WrongRandomNumber'
  }
}

const generateRandomNumber = async (input: GenerateRandomNumberInput): Promise<number> => {
  const { threshold, max } = input
  const value = Math.floor(Math.random() * Math.floor(max))

  if (value < threshold) {
    throw new WrongRandomNumber(`Value must be >= ${threshold}, generated value is ${value}`)
  }

  return value
}

const handleOneDigitNumber = async (event: SQSEvent): Promise<void> => {
  const stepFunctions = new StepFunctions()
  const body = JSON.parse(event.Records[0].body) as WaitForTaskTokenSQSMessageBody

  const params: StepFunctions.Types.SendTaskSuccessInput = {
    output: JSON.stringify({
      message: `Value ${body.Message} is handled successfully.`,
    }),
    taskToken: body.TaskToken,
  }

  await stepFunctions.sendTaskSuccess(params).promise()
}

const handleTwoDigitNumber = async (event: SQSEvent): Promise<void> => {
  const stepFunctions = new StepFunctions()
  const body = JSON.parse(event.Records[0].body) as WaitForTaskTokenSQSMessageBody

  const params: StepFunctions.Types.SendTaskSuccessInput = {
    output: JSON.stringify({
      message: `Value ${body.Message} is handled successfully.`,
    }),
    taskToken: body.TaskToken,
  }

  await stepFunctions.sendTaskSuccess(params).promise()
}

export {
  generateRandomNumber,
  handleOneDigitNumber,
  handleTwoDigitNumber,
}
