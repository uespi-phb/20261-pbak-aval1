export class InvalidEmailError extends Error {
  public constructor() {
    super('Invalid email')
    this.name = 'InvalidEmailError'
  }
}

export class Email {
  private static readonly validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  private constructor(public readonly value: string) {}

  public static create(value: string): Email {
    const normalizedValue = value.trim().toLowerCase()

    if (!Email.validEmailPattern.test(normalizedValue)) {
      throw new InvalidEmailError()
    }

    return new Email(normalizedValue)
  }
}
