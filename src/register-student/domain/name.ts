export class InvalidNameError extends Error {
  public constructor() {
    super('Invalid name')
    this.name = 'InvalidNameError'
  }
}

export class Name {
  private static readonly minLength = 5
  private static readonly validNamePattern = /^\S+ \S+(?: \S+)*$/

  private constructor(public readonly value: string) {}

  public static create(value: string): Name {
    const normalizedValue = value.trim()

    if (normalizedValue.length < Name.minLength || !Name.validNamePattern.test(normalizedValue)) {
      throw new InvalidNameError()
    }

    return new Name(normalizedValue)
  }
}
