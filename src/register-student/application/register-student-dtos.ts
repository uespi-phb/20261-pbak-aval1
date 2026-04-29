import type { StudentStatus } from '#src/register-student/domain/student'

export interface RegisterStudentInput {
  name: string
  email: string
  registrationNumber: string
}

export interface RegisterStudentOutput {
  id: string
  name: string
  email: string
  registrationNumber: string
  status: StudentStatus
}
