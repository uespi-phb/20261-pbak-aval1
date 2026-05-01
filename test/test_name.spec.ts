import { describe, test } from 'vitest'
import { InvalidNameError, Name } from '#src/register-student/domain/name'

describe('Unit Tests for Name', () => {
  test('should throw when name is empty after trim', () => {
    const name = ''

    expect(() => {
      Name.create(name)
    }).toThrow(InvalidNameError)
  })
})
