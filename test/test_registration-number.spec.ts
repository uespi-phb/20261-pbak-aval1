import { describe, test } from "vitest";
import { RegistrationNumber } from "#src/register-student/domain/registration-number";

describe("Unit Tests for RegistrationNumber", () => {
  test("should create RegistrationNumber when value has 7 digits", () => {
    const validDigits = "2024030";
    
    const expectedResult: RegistrationNumber = {
      value: "2024030"
    }

    const result = RegistrationNumber.create(validDigits);

    expect(result).toEqual(expectedResult);
  });
});