import { describe, test, expect } from 'vitest'

import { Name } from '#src/register-student/domain/name'

describe('Teste unitário para o test 4.5', () => {
  test('should throw when name has less than 5 characters after trim', () => {
    const input_value = 'Nome'
    const expected_value = 'Invalid name'
    const result = () => Name.create(input_value)
    expect(result).toThrow(expected_value)
  })
})
