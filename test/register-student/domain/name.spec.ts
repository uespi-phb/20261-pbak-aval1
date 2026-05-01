import { InvalidNameError, Name } from '#src/register-student/domain/name'

describe('Name', () => {
  it('should throw when name has only one word', () => {
    const invalidName = 'jose'

    expect(() => Name.create(invalidName)).toThrow(InvalidNameError)
  })
})
