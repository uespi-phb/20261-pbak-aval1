import { describe, it, expect, vi } from 'vitest'
import { RegistrationNumber, InvalidRegistrationNumberError } from '#src/register-student/domain/registration-number'

describe('RegistrationNumber', () => {
  
  it('should throw when registration number is empty after trim', () => {
    const matriculaComEspacos = '   ' 
    const trimSpy = vi.spyOn(String.prototype, 'trim')
 
    expect(() => RegistrationNumber.create(matriculaComEspacos))
      .toThrow(InvalidRegistrationNumberError)

    expect(trimSpy).toHaveBeenCalled()
    trimSpy.mockRestore()
  })

})