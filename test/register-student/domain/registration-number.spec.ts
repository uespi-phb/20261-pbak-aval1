import { RegistrationNumber } from '#src/register-student/domain/registration-number'

describe('RegistrationNumber', () => {
  it('should compare equal registration numbers by value', () => {
    const input: string = '1234567'
    const firstRegistrationNumber = RegistrationNumber.create(input)
    const secondRegistrationNumber = RegistrationNumber.create(input)

    expect(firstRegistrationNumber.value).toBe(secondRegistrationNumber.value)
  })
})
