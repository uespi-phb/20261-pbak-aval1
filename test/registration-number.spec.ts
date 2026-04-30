// ### 6.7
// **`should throw when registration number has less than 7 digits`**
// Deve garantir que o objeto rejeite matrículas com comprimento inferior ao mínimo permitido.

import { RegistrationNumber } from '#src/register-student/domain/registration-number'

describe('Name', () => {
  test('should throw when registration number has less than 7 digits', () => {
    const invalidRegistrationNumber = '123456'
    const errorMessage = 'Invalid registration number'
    expect(() => RegistrationNumber.create(invalidRegistrationNumber)).toThrow(errorMessage)
  })
})
