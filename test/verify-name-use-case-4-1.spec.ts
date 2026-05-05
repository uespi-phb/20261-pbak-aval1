import { describe, expect, test } from 'vitest'

import { Name } from '#src/register-student/domain/name'

describe('Name - 4.1', () => {
  test('should create Name when value is valid', () => {
    const input = 'John Doe'

    const sut = Name.create(input)

    expect(sut.value).toBe('John Doe')
  })
})
