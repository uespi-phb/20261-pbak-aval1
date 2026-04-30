import { describe, test, beforeAll } from 'vitest'
import { mock } from 'vitest-mock-extended'
import type { MockProxy } from 'vitest-mock-extended'

import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import type {
  RegisterStudentInput,
  RegisterStudentOutput,
} from '#src/register-student/application/register-student-dtos'
import { RegisterStudentUseCase } from '#src/register-student/application/register-student-use-case'
import type { SaveStudent } from '#src/register-student/application/save-student'
import { RegistrationNumber } from '#src/register-student/domain/registration-number'

describe('Unit Tests for RegisterStudentUseCase', () => {
  let input: RegisterStudentInput
  let output: RegisterStudentOutput
  let loadStudentByEmail: MockProxy<LoadStudentByEmail>
  let loadStudentByRegistrationNumber: MockProxy<LoadStudentByRegistrationNumber>
  let saveStudent: SaveStudent
  let generateId: MockProxy<GenerateId>
  let sut: RegisterStudentUseCase

  beforeAll(() => {
    input = { name: 'test of jungle', email: 'testofjungle@email.com', registrationNumber: '2024030902' }
    output = {
      id: 'any-id-test-bora-bill',
      name: 'test of jungle',
      email: 'testofjungle@email.com',
      registrationNumber: '2024030902',
      status: 'active',
    }
    loadStudentByEmail = mock<LoadStudentByEmail>()
    loadStudentByRegistrationNumber = mock<LoadStudentByRegistrationNumber>()
    saveStudent = mock<SaveStudent>()
    generateId = mock<GenerateId>()

    sut = new RegisterStudentUseCase(loadStudentByEmail, loadStudentByRegistrationNumber, saveStudent, generateId)
  })

  test('should call LoadStudentByRegistrationNumber with provided registration number', async () => {
    loadStudentByEmail.loadByEmail.mockResolvedValueOnce(null)
    loadStudentByRegistrationNumber.loadByRegistrationNumber.mockResolvedValueOnce(null)

    await sut.execute(input)

    expect(loadStudentByRegistrationNumber.loadByRegistrationNumber).toHaveBeenCalledWith(
      RegistrationNumber.create('2024030902'),
    )
  })

  test('should return created student output when input is valid', async () => {
    loadStudentByEmail.loadByEmail.mockResolvedValueOnce(null)
    loadStudentByRegistrationNumber.loadByRegistrationNumber.mockResolvedValueOnce(null)
    generateId.generate.mockReturnValue('any-id-test-bora-bill')

    const resultOutput = await sut.execute(input)

    expect(resultOutput).toStrictEqual(output)
  })
})
