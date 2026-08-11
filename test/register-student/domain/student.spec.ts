import { describe, test, expect } from 'vitest'

import { Email } from '#src/register-student/domain/email'
import { Name } from '#src/register-student/domain/name'
import { RegistrationNumber } from '#src/register-student/domain/registration-number'
import { Student } from '#src/register-student/domain/student'
import type { StudentStatus } from '#src/register-student/domain/student'

type studentInput = {
  id: string
  name: Name
  email: Email
  registrationNumber: RegistrationNumber
  status: StudentStatus
}

describe('Student', () => {
  let input: studentInput

  beforeEach(() => {
    input = {
      id: '1',
      name: Name.create('Valid Name'),
      email: Email.create('valid@email.com'),
      registrationNumber: RegistrationNumber.create('1395382'),
      status: 'active',
    }
  })

  test('should create Student with provided id, name, email and registration number', () => {
    const student = new Student(input.id, input.name, input.email, input.registrationNumber, input.status)

    expect(student).toEqual(input)
  })
})
