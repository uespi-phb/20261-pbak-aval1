import { describe, expect, test, vi } from 'vitest'

import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import { RegisterStudentUseCase } from '#src/register-student/application/register-student-use-case'
import type { SaveStudent } from '#src/register-student/application/save-student'
import { Student } from '#src/register-student/domain/student'

describe('RegisterStudentUseCase - 7.2', () => {
  test('should create Student with active status by default', async () => {

    const loadByEmail = vi.fn<LoadStudentByEmail['loadByEmail']>(async () => null)
    const loadByRegistrationNumber = vi.fn<LoadStudentByRegistrationNumber['loadByRegistrationNumber']>(
      async () => null,
    )
    const save = vi.fn<SaveStudent['save']>(async () => undefined)
    const generate = vi.fn(() => 'generated-id')

    const sut = new RegisterStudentUseCase(
      { loadByEmail } satisfies LoadStudentByEmail,
      { loadByRegistrationNumber } satisfies LoadStudentByRegistrationNumber,
      { save } satisfies SaveStudent,
      { generate } satisfies GenerateId,
    )

    const input = {
      name: 'John Doe',
      email: 'test@example.com',
      registrationNumber: '1234567',
    }


    await sut.execute(input)


    expect(save).toHaveBeenCalledTimes(1)
    const createdStudent = save.mock.calls[0]?.[0]
    expect(createdStudent).toBeDefined()
    if (createdStudent === undefined) {
      throw new Error('Expected SaveStudent to be called with a student')
    }
    expect(createdStudent).toBeInstanceOf(Student)
    expect(createdStudent.status).toBe('active')
  })
})
