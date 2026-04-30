import { describe, test, it, expect } from 'vitest'

import { RegistrationNumber } from '#src/register-student/domain/registration-number'

describe('RegistrationNumberCase', () => {
  test.each(['24563456', '123456789'])('should throw when registration number has 8 or 9 digits', async () => {
    ;(registration: string) => {
      expect(() => RegistrationNumber.create(registration)).toThrow('Invalid registration number')
    }
  })
})
