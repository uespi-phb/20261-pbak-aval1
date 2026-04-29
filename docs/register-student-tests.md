# RegisterStudentUseCase - suggested tests

## Value objects

- `Name.create` should trim and accept names with at least 2 words and at least 5 characters.
- `Name.create` should throw `InvalidNameError` for empty, blank, one-word, or shorter than 5-character names.
- `Name.create` should throw `InvalidNameError` when there are additional spaces between words.
- `Email.create` should trim, lowercase, and accept valid email addresses.
- `Email.create` should throw `InvalidEmailError` for missing, blank, or malformed email addresses.
- `RegistrationNumber.create` should trim and accept values with exactly 7 or 10 numeric digits.
- `RegistrationNumber.create` should throw `InvalidRegistrationNumberError` for blank, non-numeric, spaced, shorter, longer, or unsupported length values.

## RegisterStudentUseCase

- should register an active student and return `id`, `name`, `email`, `registrationNumber`, and `status`.
- should call `GenerateId` to create the student id.
- should save the created `Student`.
- should check duplicated email before checking duplicated registration number.
- should throw `DuplicatedEmailError` when an existing student is found by email.
- should not save a student when email is duplicated.
- should throw `DuplicatedRegistrationNumberError` when an existing student is found by registration number.
- should not save a student when registration number is duplicated.
- should propagate value object validation errors for invalid name, email, or registration number.
