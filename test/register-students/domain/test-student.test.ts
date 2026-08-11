import { describe, it, expect } from 'vitest'
import { Student, type StudentStatus } from '#src/register-student/domain/student'
import type { Name } from '#src/register-student/domain/name'
import type { Email } from '#src/register-student/domain/email'
import type { RegistrationNumber } from '#src/register-student/domain/registration-number'

describe('Student', () => {
  
  it('should expose student data in consistent state', () => {
    const mockId = '123e4567-e89b-12d3-a456-426614174000'
    const mockName = { value: 'João da Silva' } as unknown as Name
    const mockEmail = { value: 'joao.silva@uespi.br' } as unknown as Email
    const mockRegistrationNumber = { value: '1234567890' } as unknown as RegistrationNumber
    const mockStatus: StudentStatus = 'active'

    const student = new Student(
      mockId,
      mockName,
      mockEmail,
      mockRegistrationNumber,
      mockStatus
    )

    expect(student.id).toBe(mockId)
    expect(student.name).toBe(mockName)
    expect(student.email).toBe(mockEmail)
    expect(student.registrationNumber).toBe(mockRegistrationNumber)
    expect(student.status).toBe(mockStatus)
  })

})