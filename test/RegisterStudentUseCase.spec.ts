import { describe, test, it, expect } from 'vitest'
import { mock, type MockProxy } from 'vitest-mock-extended'

import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import { RegisterStudentUseCase } from '#src/register-student/application/register-student-use-case'
import type { SaveStudent } from '#src/register-student/application/save-student'

describe('RegisterStudentUseCase', () => {
  let loadStudentByEmail: MockProxy<LoadStudentByEmail>
  let loadByRegistrationNumber: MockProxy<LoadStudentByRegistrationNumber>
  let saveStudent: MockProxy<SaveStudent>
  let generateId: MockProxy<GenerateId>

  const input = {
    name: 'João da Silva',
    email: 'fulano@email.com',
    registrationNumber: '1234567',
  }

  loadStudentByEmail = mock<LoadStudentByEmail>()
  loadStudentByEmail.loadByEmail.mockResolvedValue(null)
  loadByRegistrationNumber = mock<LoadStudentByRegistrationNumber>()
  loadByRegistrationNumber.loadByRegistrationNumber.mockResolvedValue(null)
  saveStudent = mock<SaveStudent>()
  saveStudent.save.mockResolvedValue()
  generateId = mock<GenerateId>()
  generateId.generate.mockResolvedValue(' ')

  const sut = new RegisterStudentUseCase(loadStudentByEmail, loadByRegistrationNumber, saveStudent, generateId)

  test('should call SaveStudent with created student', async () => {
    await sut.execute(input)

    expect(saveStudent.save).toHaveBeenCalled()
    expect(saveStudent.save).toHaveBeenCalledOnce()
  })

  test('should call GenerateId when input is valid', async () => {
    await sut.execute(input)

    expect(generateId.generate).toHaveBeenCalled()
    expect(generateId.generate).toHaveBeenCalledOnce()
  })
})
