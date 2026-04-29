import type { Email } from '#src/register-student/domain/email'
import type { Name } from '#src/register-student/domain/name'
import type { RegistrationNumber } from '#src/register-student/domain/registration-number'

export type StudentStatus = 'active'

export class Student {
  public constructor(
    public readonly id: string,
    public readonly name: Name,
    public readonly email: Email,
    public readonly registrationNumber: RegistrationNumber,
    public readonly status: StudentStatus,
  ) {}
}
