import type { MockProxy } from 'vitest-mock-extended'
import { mock } from 'vitest-mock-extended'

import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import type { RegisterStudentInput } from '#src/register-student/application/register-student-dtos'
import { RegisterStudentUseCase } from '#src/register-student/application/register-student-use-case'
import type { SaveStudent } from '#src/register-student/application/save-student'
import { InvalidEmailError } from '#src/register-student/domain/email'

describe('Register-student-use-case', () => {
  let loadStudentByEmail: MockProxy<LoadStudentByEmail>
  let loadStudentByRegistrationNumber: MockProxy<LoadStudentByRegistrationNumber>
  let saveStudent: MockProxy<SaveStudent>
  let generateId: MockProxy<GenerateId>

  let sut: RegisterStudentUseCase

  let input: RegisterStudentInput
  beforeEach(() => {
    loadStudentByEmail = mock<LoadStudentByEmail>()
    loadStudentByRegistrationNumber = mock<LoadStudentByRegistrationNumber>()
    saveStudent = mock<SaveStudent>()
    generateId = mock<GenerateId>()
    sut = new RegisterStudentUseCase(loadStudentByEmail, loadStudentByRegistrationNumber, saveStudent, generateId)

    input = {
      name: 'jonh doe',
      email: 'jonhdoe@example.com',
      registrationNumber: '2026081510',
    }
  })
  it.each(['jonhdoe@email', 'jonh doe', 'jonhdoe.com', '    ', ''])(
    'should throw when email input is invalid %s',
    async (email: unknown) => {
      const invalidEmailInput = {
        ...input,
        email: email as string,
      }

      await expect(() => sut.execute(invalidEmailInput)).rejects.toThrow(InvalidEmailError)
    },
  )

  it('should propagate error from GenerateId', async () => {
    loadStudentByEmail.loadByEmail.mockResolvedValue(null)
    loadStudentByRegistrationNumber.loadByRegistrationNumber.mockResolvedValue(null)

    generateId.generate.mockImplementationOnce(() => {
      throw new Error('GenerateID Error')
    })

    await expect(() => sut.execute(input)).rejects.toThrow(new Error('GenerateID Error'))
  })
})
