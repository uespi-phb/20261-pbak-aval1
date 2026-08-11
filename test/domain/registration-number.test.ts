import { describe, it, expect } from 'vitest'

import { InvalidRegistrationNumberError, RegistrationNumber } from '#src/register-student/domain/registration-number'

describe('RegistrationNumber', () => {
  it('should reject resgitration numbers with non-numeric characters', () => {
    const InvalidRegistrationNumber = '123456a'
    expect(() => RegistrationNumber.create(InvalidRegistrationNumber)).toThrow(InvalidRegistrationNumberError)
  })
})
