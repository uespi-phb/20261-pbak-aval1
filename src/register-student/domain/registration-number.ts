export class InvalidRegistrationNumberError extends Error {
  public constructor() {
    super('Invalid registration number')
    this.name = 'InvalidRegistrationNumberError'
  }
}

export class RegistrationNumber {
  private static readonly validRegistrationNumberPattern = /^(?:\d{7}|\d{10})$/

  private constructor(public readonly value: string) {}

  public static create(value: string): RegistrationNumber {
    const normalizedValue = value.trim()

    if (!RegistrationNumber.validRegistrationNumberPattern.test(normalizedValue)) {
      throw new InvalidRegistrationNumberError()
    }

    return new RegistrationNumber(normalizedValue)
  }
}
