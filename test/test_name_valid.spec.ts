import { test, describe } from 'vitest'

import { Name } from '#src/register-student/domain/name'

describe('testes unitários para name', () => {
  test('should preserve normalized name value when valid', () => {
    const value = 'felipe martins'
    const expected_value = { value: value }

    const result = Name.create(value)

    expect(result).toEqual(expected_value)
  })
})
