import { describe, test, it, expect } from 'vitest'

import { Name } from '#src/register-student/domain/name'

describe('Name', () => {
  test('should throw when name contains additional spaces between words', () => {
    const name = 'Paulo  Henrique '

    expect(() => Name.create(name)).toThrow('Invalid name')
  })
})
