import { mock, type MockProxy } from 'vitest-mock-extended'

import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import type { RegisterStudentInput } from '#src/register-student/application/register-student-dtos'
import {
  DuplicatedEmailError,
  RegisterStudentUseCase,
} from '#src/register-student/application/register-student-use-case'
import type { SaveStudent } from '#src/register-student/application/save-student'
import { Email } from '#src/register-student/domain/email'
import { Name } from '#src/register-student/domain/name'
import { RegistrationNumber } from '#src/register-student/domain/registration-number'
import type { Student } from '#src/register-student/domain/student'

describe('RegisterStudentUseCase', () => {
  let input: RegisterStudentInput
  let student: Student
  let loadStudentByemail: MockProxy<LoadStudentByEmail>
  let loadStudentByRegistrationNumber: MockProxy<LoadStudentByRegistrationNumber>
  let saveStudent: MockProxy<SaveStudent>
  let generateId: MockProxy<GenerateId>
  let sut: RegisterStudentUseCase

  beforeAll(() => {
    generateId = mock<GenerateId>()
    generateId.generate.mockResolvedValue('1234567')

    input = {
      name: 'Eyder Rios',
      email: 'eyderrios@email.com',
      registrationNumber: '1234517',
    }

    student = {
      id: generateId.generate(),
      name: Name.create(input.name),
      email: Email.create(input.email),
      registrationNumber: RegistrationNumber.create(input.registrationNumber),
      status: 'active',
    }

    loadStudentByemail = mock<LoadStudentByEmail>()
    loadStudentByemail.loadByEmail.mockResolvedValue(student)

    loadStudentByRegistrationNumber = mock<LoadStudentByRegistrationNumber>()
    loadStudentByRegistrationNumber.loadByRegistrationNumber.mockResolvedValue(student)

    saveStudent = mock<SaveStudent>()

    sut = new RegisterStudentUseCase(loadStudentByemail, loadStudentByRegistrationNumber, saveStudent, generateId)
  })

  it('Should call LoadStudentByEmail with provided email', async () => {
    loadStudentByemail.loadByEmail.mockResolvedValueOnce(null)
    loadStudentByRegistrationNumber.loadByRegistrationNumber.mockResolvedValueOnce(null)

    await sut.execute(input)

    expect(loadStudentByemail.loadByEmail).toHaveBeenCalledWith(student.email)
  })

  it('Should throw when email already exists', async () => {
    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow(new DuplicatedEmailError())
  })
})
