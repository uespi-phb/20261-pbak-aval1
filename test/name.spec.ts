// ### 4.8
// **`should compare equal names by value`**
// Deve verificar igualdade por valor, caso o objeto implemente comparação semântica entre instâncias.

import { Name } from '#src/register-student/domain/name'

describe('Name', () => {
  test('should compare equal names by value', () => {
    const name1 = Name.create('John Doe')
    const name2 = Name.create('John Doe')
    expect(name1.value).toBe(name2.value)
  })
})
