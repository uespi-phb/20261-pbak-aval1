import { DuplicatedRegistrationNumberError, RegisterStudentUseCase } from '#src/register-student/application/register-student-use-case'
import { InvalidRegistrationNumberError, RegistrationNumber } from '#src/register-student/domain/registration-number'

describe("RegisterStudentUseCase tests", () => {
  it('should call LoadStudentByRegistrationNumber with provided registration number (1.2)', async () => {
    const loadEmail = { loadByEmail: vi.fn().mockResolvedValueOnce(null) }
    const loadRegNumber = { loadByRegistrationNumber: vi.fn().mockResolvedValueOnce(null) }
    const save = { save: vi.fn() }
    const id = { generate: vi.fn() }
    const sut = new RegisterStudentUseCase(loadEmail, loadRegNumber, save, id)

    const input = {
      name: 'user name',
      email: 'email@teste.com',
      registrationNumber: '1234567'
    }

    await sut.execute(input)

    expect(loadRegNumber.loadByRegistrationNumber).toHaveBeenCalledWith(RegistrationNumber.create(input.registrationNumber)
    )
  })


  it('should throw when registration number already exists (1.7)', async () => {
    const loadEmail = { loadByEmail: vi.fn().mockResolvedValue(null) }
    const loadRegNumber = { loadByRegistrationNumber: vi.fn().mockResolvedValue('existing user') }
    const save = { save: vi.fn() }
    const id = { generate: vi.fn() }

    const sut = new RegisterStudentUseCase(loadEmail, loadRegNumber, save, id)

    const input = {
      name: 'user name',
      email: 'email@teste.com',
      registrationNumber: '1234567'
    }

    const result = sut.execute(input)

    await expect(result).rejects.toThrow(new DuplicatedRegistrationNumberError())
  })


  it('should trim external spaces before validation (6.3)', async () => {
    const loadEmail = { loadByEmail: vi.fn().mockResolvedValue(null) }
    const loadRegNumber = { loadByRegistrationNumber: vi.fn().mockResolvedValue(null) }
    const save = { save: vi.fn() }
    const id = { generate: vi.fn() }

    const sut = new RegisterStudentUseCase(loadEmail, loadRegNumber, save, id)

    const input = {
      name: 'user name',
      email: 'email@teste.com',
      registrationNumber: '  1234567  '
    }

    await sut.execute(input)

    expect(loadRegNumber.loadByRegistrationNumber).toHaveBeenCalledWith(RegistrationNumber.create('1234567'))
  })


  it('should throw when registration number has more than 10 digits (6.9)', async () => {
    const loadEmail = { loadByEmail: vi.fn().mockResolvedValue(null) }
    const loadRegNumber = { loadByRegistrationNumber: vi.fn().mockResolvedValue(null) }
    const save = { save: vi.fn() }
    const id = {generate : vi.fn()}

    const sut = new RegisterStudentUseCase(loadEmail, loadRegNumber, save, id)

    const input = {
      name: 'user name',
      email: 'email@teste.com',
      registrationNumber: '12345678901'
    }

    const result = sut.execute(input)

    await expect(result).rejects.toThrow(new InvalidRegistrationNumberError())
  })
})