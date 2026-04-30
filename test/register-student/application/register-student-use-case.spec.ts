import { describe, test, expect } from 'vitest'
import type { MockProxy } from 'vitest-mock-extended'
import { mock } from 'vitest-mock-extended'

import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import type { RegisterStudentInput } from '#src/register-student/application/register-student-dtos'
import {
  DuplicatedRegistrationNumberError,
  RegisterStudentUseCase,
} from '#src/register-student/application/register-student-use-case'
import type { SaveStudent } from '#src/register-student/application/save-student'
import { Email } from '#src/register-student/domain/email'
import { Name } from '#src/register-student/domain/name'
import { RegistrationNumber } from '#src/register-student/domain/registration-number'
import { Student, type StudentStatus } from '#src/register-student/domain/student'

//1.12

describe('RegisterStudentUseCase', () => {
  let loadStudentByEmail: MockProxy<LoadStudentByEmail>
  let loadStudentByRegistrationNumber: MockProxy<LoadStudentByRegistrationNumber>
  let saveStudent: MockProxy<SaveStudent>
  let generateId: MockProxy<GenerateId>
  let input: RegisterStudentInput
  let registerStudentUseCase: RegisterStudentUseCase
  let student: Student
  let name: Name
  let registrationNumber: RegistrationNumber
  let email: Email
  let status: StudentStatus

  test('should propagate error from LoadStudentByEmail', async () => {
    const error = new Error('loadStudentByEmail error.')

    loadStudentByEmail = mock<LoadStudentByEmail>()
    loadStudentByEmail.loadByEmail.mockRejectedValueOnce(error)
    loadStudentByRegistrationNumber = mock<LoadStudentByRegistrationNumber>()
    saveStudent = mock<SaveStudent>()
    generateId = mock<GenerateId>()
    input = {
      name: 'Valid Name',
      email: 'valid@email.com',
      registrationNumber: '1685493',
    }
    registerStudentUseCase = new RegisterStudentUseCase(
      loadStudentByEmail,
      loadStudentByRegistrationNumber,
      saveStudent,
      generateId,
    )
    await expect(registerStudentUseCase.execute(input)).rejects.toThrow()
  })

  //1.18

  test('should not call SaveStudent when registration number already exists', async () => {
    name = Name.create('Valid Name')
    email = Email.create('valid@email.com')
    registrationNumber = RegistrationNumber.create('3958647')
    status = 'active'

    student = new Student('1', name, email, registrationNumber, status)

    loadStudentByEmail = mock<LoadStudentByEmail>()
    loadStudentByEmail.loadByEmail.mockResolvedValueOnce(null)
    loadStudentByRegistrationNumber = mock<LoadStudentByRegistrationNumber>()
    loadStudentByRegistrationNumber.loadByRegistrationNumber.mockResolvedValueOnce(student)
    saveStudent = mock<SaveStudent>()
    generateId = mock<GenerateId>()
    input = {
      name: 'Valid Name',
      email: 'valid@email.com',
      registrationNumber: '1685493',
    }
    registerStudentUseCase = new RegisterStudentUseCase(
      loadStudentByEmail,
      loadStudentByRegistrationNumber,
      saveStudent,
      generateId,
    )

    await expect(registerStudentUseCase.execute(input)).rejects.toThrow(DuplicatedRegistrationNumberError)

    expect(saveStudent.save).not.toHaveBeenCalled()
  })
})
