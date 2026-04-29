import type { Email } from '#src/register-student/domain/email'
import type { Student } from '#src/register-student/domain/student'

export interface LoadStudentByEmail {
  loadByEmail: (email: Email) => Promise<Student | null>
}
