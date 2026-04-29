import type { RegistrationNumber } from '#src/register-student/domain/registration-number'
import type { Student } from '#src/register-student/domain/student'

export interface LoadStudentByRegistrationNumber {
  loadByRegistrationNumber: (registrationNumber: RegistrationNumber) => Promise<Student | null>
}
