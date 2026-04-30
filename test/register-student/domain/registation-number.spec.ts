import { InvalidRegistrationNumberError, RegistrationNumber } from '#src/register-student/domain/registration-number'

describe('Registration-number', () => {
  it('should trhow when registration number contains spaces', () => {
    const invalidRegistrationNumber = '12345 6789'

    expect(() => RegistrationNumber.create(invalidRegistrationNumber)).toThrow(InvalidRegistrationNumberError)
  })
})
