//1.13
import { describe, expect, test } from 'vitest'
import type { MockProxy } from 'vitest-mock-extended'
import { mock } from 'vitest-mock-extended'

import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import type { RegisterStudentInput } from '#src/register-student/application/register-student-dtos'
import { RegisterStudentUseCase } from '#src/register-student/application/register-student-use-case'
import type { SaveStudent } from '#src/register-student/application/save-student'
import { InvalidNameError } from '#src/register-student/domain/name'

describe('RegisterStudentUseCase', () => {
  let loadStudentByEmail: MockProxy<LoadStudentByEmail>
  let loadStudentByRegistrationNumber: MockProxy<LoadStudentByRegistrationNumber>
  let saveStudent: MockProxy<SaveStudent>
  let generateId: MockProxy<GenerateId>

  beforeEach(() => {
    loadStudentByEmail = mock<LoadStudentByEmail>()
    loadStudentByRegistrationNumber = mock<LoadStudentByRegistrationNumber>()
    loadStudentByRegistrationNumber.loadByRegistrationNumber.mockRejectedValue(
      new Error('Error Load By Registration Number'),
    )
    saveStudent = mock<SaveStudent>()
    generateId = mock<GenerateId>()
  })

  test('should propagate error from LoadStudentByRegistrationNumber', async () => {
    const useCase = new RegisterStudentUseCase(
      loadStudentByEmail,
      loadStudentByRegistrationNumber,
      saveStudent,
      generateId,
    )

    const input: RegisterStudentInput = {
      name: 'Eyder Rios',
      email: 'eyderrios@email.com',
      registrationNumber: '6931251',
    }

    await expect(useCase.execute(input)).rejects.toThrow(Error)
  })

  //1.3
  test('should throw when name input is invalid', async () => {
    const useCase = new RegisterStudentUseCase(
      loadStudentByEmail,
      loadStudentByRegistrationNumber,
      saveStudent,
      generateId,
    )

    const input: RegisterStudentInput = {
      name: 'Ana',
      email: 'eyderrios@email.com',
      registrationNumber: '1234567',
    }

    await expect(useCase.execute(input)).rejects.toThrow(InvalidNameError)
  })
})
