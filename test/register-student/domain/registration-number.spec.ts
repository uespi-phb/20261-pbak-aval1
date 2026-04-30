import { describe, test, expect } from 'vitest'

import { RegistrationNumber } from '#src/register-student/domain/registration-number'

//6.10

describe('RegistrationNumber', () => {
  test('should preserve normalized registration number value when valid', () => {
    const input = '   3247649   '
    const registrationNumber = RegistrationNumber.create(input)

    expect(registrationNumber.value).toStrictEqual('3247649')
  })
})
