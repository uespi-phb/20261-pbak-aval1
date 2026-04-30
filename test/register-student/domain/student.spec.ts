import { mock, type MockProxy } from 'vitest-mock-extended'

import type { GenerateId } from '#src/register-student/application/generate-id'
import { Email } from '#src/register-student/domain/email'
import { Name } from '#src/register-student/domain/name'
import { RegistrationNumber } from '#src/register-student/domain/registration-number'
import { Student } from '#src/register-student/domain/student'

describe('Student', () => {
  let input: Student
  let generateId: MockProxy<GenerateId>
  let sut: Student

  beforeAll(() => {
    generateId = mock<GenerateId>()
    generateId.generate.mockResolvedValue('1234567')
    input = {
      id: generateId.generate(),
      name: Name.create('Eyder Rios'),
      email: Email.create('eyderrios@gmail.com'),
      registrationNumber: RegistrationNumber.create('1234567'),
      status: 'active',
    }
    sut = new Student(input.id, input.name, input.email, input.registrationNumber, input.status)
  })

  it('should preserve identity once created', () => {
    expect(sut.id).toBe(input.id)
    expect(sut.name).toBe(input.name)
    expect(sut.email).toBe(input.email)
    expect(sut.registrationNumber).toBe(input.registrationNumber)
    expect(sut.status).toBe(input.status)
  })
})
