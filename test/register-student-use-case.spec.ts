// ### 1.5
// **`should throw when registration number input is invalid`**
// Deve garantir que o caso de uso falha adequadamente quando a matrícula informada viola as regras definidas no domínio.

// ### 1.15
// **`should propagate error from SaveStudent`**
// Deve garantir que erros ocorridos na persistência do estudante sejam propagados corretamente.

import type { MockProxy } from 'vitest-mock-extended'
import { mock } from 'vitest-mock-extended'

import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import type { RegisterStudentInput } from '#src/register-student/application/register-student-dtos'
import { RegisterStudentUseCase } from '#src/register-student/application/register-student-use-case'
import type { SaveStudent } from '#src/register-student/application/save-student'

describe('RegisterStudentUseCase', () => {
  let loadStudentByEmail: MockProxy<LoadStudentByEmail>
  let loadStudentByRegistrationNumber: MockProxy<LoadStudentByRegistrationNumber>
  let saveStudent: MockProxy<SaveStudent>
  let generateId: MockProxy<GenerateId>
  let sut: RegisterStudentUseCase
  let input: RegisterStudentInput

  beforeEach(() => {
    input = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      registrationNumber: '1234567890',
    }
    loadStudentByRegistrationNumber = mock<LoadStudentByRegistrationNumber>()
    loadStudentByEmail = mock<LoadStudentByEmail>()
    saveStudent = mock<SaveStudent>()
    generateId = mock<GenerateId>()
    sut = new RegisterStudentUseCase(loadStudentByEmail, loadStudentByRegistrationNumber, saveStudent, generateId)
    loadStudentByEmail.loadByEmail.mockResolvedValue(null)
  })

  test.each(['123', '12345678901', 'ABC', '1234567'])(
    'should throw when registration number input is invalid',
    async (invalidRegistrationNumber: string) => {
      const error = new Error('Invalid registration number')
      loadStudentByRegistrationNumber.loadByRegistrationNumber.mockImplementationOnce(() => {
        throw error
      })
      input.registrationNumber = invalidRegistrationNumber
      await expect(() => sut.execute(input)).rejects.toThrow(error.message)
    },
  )

  test('should propagate error from SaveStudent', async () => {
    saveStudent.save.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(input)).rejects.toThrow()
  })
})
