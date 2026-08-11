import { describe, it, expect } from 'vitest'
import { mock, type MockProxy } from 'vitest-mock-extended'

import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import type { RegisterStudentInput } from '#src/register-student/application/register-student-dtos'
import { RegisterStudentUseCase } from '#src/register-student/application/register-student-use-case'
import type { SaveStudent } from '#src/register-student/application/save-student'
import { Email } from '#src/register-student/domain/email'
import { Name } from '#src/register-student/domain/name'
import { RegistrationNumber } from '#src/register-student/domain/registration-number'
import { Student } from '#src/register-student/domain/student'

describe('RegisterStudentUseCase SaveStudent', () => {
  let mockLoadByEmail: MockProxy<LoadStudentByEmail>
  let mockLoadByRegNumber: MockProxy<LoadStudentByRegistrationNumber>
  let mockSaveStudent: MockProxy<SaveStudent>
  let mockGenerateId: MockProxy<GenerateId>
  let sut: RegisterStudentUseCase

  beforeAll(() => {
    mockLoadByEmail = mock<LoadStudentByEmail>()
    mockLoadByRegNumber = mock<LoadStudentByRegistrationNumber>()
    mockSaveStudent = mock<SaveStudent>()
    mockGenerateId = mock<GenerateId>()
    sut = new RegisterStudentUseCase(mockLoadByEmail, mockLoadByRegNumber, mockSaveStudent, mockGenerateId)
  })

  it('Should call SaveStudent with created student', async () => {
    const input: RegisterStudentInput = {
      name: 'Tigrezo Watzap',
      email: 'montres@gmail.com',
      registrationNumber: '2026009',
    }

    mockLoadByEmail.loadByEmail.mockResolvedValueOnce(null)
    mockLoadByRegNumber.loadByRegistrationNumber.mockResolvedValue(null)
    mockGenerateId.generate.mockReturnValue('420561')

    await sut.execute(input)
    expect(mockSaveStudent.save).toHaveBeenCalled()
  })

  it('Should not call SaveStudent when email already exists', async () => {
    const input: RegisterStudentInput = {
      name: 'Tigrezo Watzap',
      email: 'montres@gmail.com',
      registrationNumber: '2026009',
    }

    const existingStudent = new Student(
      '420561',
      Name.create(input.name),
      Email.create(input.email),
      RegistrationNumber.create(input.registrationNumber),
      'active',
    )

    mockLoadByEmail.loadByEmail.mockResolvedValue(existingStudent)
    await expect(sut.execute(input)).rejects.toThrow('Email already registered')
    expect(mockSaveStudent.save).not.toHaveBeenCalled()
  })
})
