import type { GenerateId } from '#src/register-student/application/generate-id'
import type { LoadStudentByEmail } from '#src/register-student/application/load-student-by-email'
import type { LoadStudentByRegistrationNumber } from '#src/register-student/application/load-student-by-registration-number'
import type { RegisterStudentInput, RegisterStudentOutput } from '#src/register-student/application/register-student-dtos'
import type { SaveStudent } from '#src/register-student/application/save-student'
import { Email } from '#src/register-student/domain/email'
import { Name } from '#src/register-student/domain/name'
import { RegistrationNumber } from '#src/register-student/domain/registration-number'
import { Student } from '#src/register-student/domain/student'
import type { UseCase } from '#src/usecase'

export class DuplicatedEmailError extends Error {
  public constructor() {
    super('Email already registered')
    this.name = 'DuplicatedEmailError'
  }
}

export class DuplicatedRegistrationNumberError extends Error {
  public constructor() {
    super('Registration number already registered')
    this.name = 'DuplicatedRegistrationNumberError'
  }
}

export class RegisterStudentUseCase implements UseCase<RegisterStudentInput, RegisterStudentOutput> {
  public constructor(
    private readonly loadStudentByEmail: LoadStudentByEmail,
    private readonly loadStudentByRegistrationNumber: LoadStudentByRegistrationNumber,
    private readonly saveStudent: SaveStudent,
    private readonly generateId: GenerateId,
  ) {}

  public async execute(input: RegisterStudentInput): Promise<RegisterStudentOutput> {
    const name = Name.create(input.name)
    const email = Email.create(input.email)
    const registrationNumber = RegistrationNumber.create(input.registrationNumber)

    const studentWithSameEmail = await this.loadStudentByEmail.loadByEmail(email)

    if (studentWithSameEmail !== null) {
      throw new DuplicatedEmailError()
    }

    const studentWithSameRegistrationNumber =
      await this.loadStudentByRegistrationNumber.loadByRegistrationNumber(registrationNumber)

    if (studentWithSameRegistrationNumber !== null) {
      throw new DuplicatedRegistrationNumberError()
    }

    const student = new Student(this.generateId.generate(), name, email, registrationNumber, 'active')

    await this.saveStudent.save(student)

    return {
      id: student.id,
      name: student.name.value,
      email: student.email.value,
      registrationNumber: student.registrationNumber.value,
      status: student.status,
    }
  }
}
