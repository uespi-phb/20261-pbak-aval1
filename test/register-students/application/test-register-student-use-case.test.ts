import { describe, it, expect, vi } from 'vitest'
import { RegisterStudentUseCase } from '#src/register-student/application/register-student-use-case'
import { InvalidRegistrationNumberError } from '#src/register-student/domain/registration-number'

describe('RegisterStudentUseCase', () => {

  it('should not call GenerateId when input is invalid', async () => {
   
    const mockLoadStudentByEmail = { loadByEmail: vi.fn() }
    const mockLoadStudentByRegistrationNumber = { loadByRegistrationNumber: vi.fn() }
    const mockSaveStudent = { save: vi.fn() }

    const mockGenerateId = { generate: vi.fn() }

    const sut = new RegisterStudentUseCase(
      mockLoadStudentByEmail as any,
      mockLoadStudentByRegistrationNumber as any,
      mockSaveStudent as any,
      mockGenerateId as any
    )

    const invalidInput = {import: { describe, it, expect, vi },

      name: 'João Silva',
      email: 'joao.silva@uespi.br',
      registrationNumber: '   ' 
    }

    await expect(sut.execute(invalidInput)).rejects.toThrow(InvalidRegistrationNumberError)

    expect(mockGenerateId.generate).not.toHaveBeenCalled()

    expect(mockLoadStudentByEmail.loadByEmail).not.toHaveBeenCalled()
    expect(mockSaveStudent.save).not.toHaveBeenCalled()
  })

})


describe('RegisterStudentUseCase', () => {

  it('should call GenerateId when input is valid', async () => {
    const mockLoadStudentByEmail = { loadByEmail: vi.fn().mockResolvedValue(null) }
    const mockLoadStudentByRegistrationNumber = { loadByRegistrationNumber: vi.fn().mockResolvedValue(null) }
    const mockSaveStudent = { save: vi.fn().mockResolvedValue(undefined) }
    
    const mockGenerateId = { generate: vi.fn().mockReturnValue('mock-id-123') }

    const sut = new RegisterStudentUseCase(
      mockLoadStudentByEmail as any,
      mockLoadStudentByRegistrationNumber as any,
      mockSaveStudent as any,
      mockGenerateId as any
    )

    const validInput = {
      name: 'João Silva',
      email: 'joao.silva@uespi.br',
      registrationNumber: '1234567' 
    }

    await sut.execute(validInput)

    expect(mockGenerateId.generate).toHaveBeenCalled()
    
    expect(mockGenerateId.generate).toHaveBeenCalledOnce()
  })

})