import { describe, it, expect } from 'vitest'

import { Name } from '#src/register-student/domain/name'

describe('should trim external spaces before validation.', () => {
  it('he must remove any outer spaces from the name before validating.', () => {
    const nameTestSpaces = '  Eyder Rios  '
    const nameResult = Name.create(nameTestSpaces)
    expect(nameResult.value).toBe('Eyder Rios')
  })

  it('will give an error if the name is too short after removing the spaces.', () => {
    const nameTestShortSpaces = ' Enzo '
    expect(() => {
      Name.create(nameTestShortSpaces)
    }).toThrow('Invalid name')
  })
})
