import type { Student } from '#src/register-student/domain/student'

export interface SaveStudent {
  save: (student: Student) => Promise<void>
}
