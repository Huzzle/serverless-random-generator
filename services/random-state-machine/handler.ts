interface GenerateRandomNumberInput {
  threshold: number
}

class WrongRandomNumber extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'WrongRandomNumber'
  }
}

const generateRandomNumber = async (input: GenerateRandomNumberInput): Promise<number> => {
  const { threshold } = input
  const value = Math.floor(Math.random() * Math.floor(10))

  if (value < threshold) {
    throw new WrongRandomNumber(`Value must be >= ${threshold}, generated value is ${value}`)
  }

  return value
}

export {
  generateRandomNumber,
}
