## Tarefas de Cada Equipe

Cada equipe deverá implementar 4 testes automatizados:

- 2 testes do Grupo Application Layer
- 2 testes do Grupo Domain Layer

O Grupo Application Layer contém testes do `RegisterStudentUseCase`.

O Grupo Domain Layer contém testes dos objetos `Name`, `RegistrationNumber` e `Student`.

| Equipe    | Grupo Application Layer                                                                                                                                              | Grupo Domain Layer                                                                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Equipe 1  | **1.9** should create Student with generated id and active status<br>**1.1** should call LoadStudentByEmail with provided email                                      | **4.1** should create Name when value is valid<br>**7.2** should create Student with active status by default                                                   |
| Equipe 2  | **1.11** should return created student output when input is valid<br>**1.2** should call LoadStudentByRegistrationNumber with provided registration number           | **6.1** should create RegistrationNumber when value has 7 digits<br>**4.3** should throw when name is empty after trim                                          |
| Equipe 3  | **1.16** should not call GenerateId when input is invalid<br>**1.8** should call GenerateId when input is valid                                                      | **7.3** should expose student data in consistent state<br>**6.4** should throw when registration number is empty after trim                                     |
| Equipe 4  | **1.17** should not call SaveStudent when email already exists<br>**1.10** should call SaveStudent with created student                                              | **4.5** should throw when name has less than 5 characters after trim<br>**4.7** should preserve normalized name value when valid                                |
| Equipe 5  | **1.18** should not call SaveStudent when registration number already exists<br>**1.12** should propagate error from LoadStudentByEmail                              | **7.1** should create Student with provided id, name, email and registration number<br>**6.10** should preserve normalized registration number value when valid |
| Equipe 6  | **1.3** should throw when name input is invalid<br>**1.13** should propagate error from LoadStudentByRegistrationNumber                                              | **4.2** should trim external spaces before validation<br>**6.5** should throw when registration number contains non-digit characters                            |
| Equipe 7  | **1.4** should throw when email input is invalid<br>**1.14** should propagate error from GenerateId                                                                  | **4.4** should throw when name has only one word<br>**6.6** should throw when registration number contains spaces                                               |
| Equipe 8  | **1.5** should throw when registration number input is invalid<br>**1.15** should propagate error from SaveStudent                                                   | **4.8** should compare equal names by value<br>**6.7** should throw when registration number has less than 7 digits                                             |
| Equipe 9  | **1.6** should throw when email already exists<br>**1.1** should call LoadStudentByEmail with provided email **(repetido)**                                          | **6.11** should compare equal registration numbers by value<br>**7.4** should preserve identity once created                                                    |
| Equipe 10 | **1.7** should throw when registration number already exists<br>**1.2** should call LoadStudentByRegistrationNumber with provided registration number **(repetido)** | **6.3** should trim external spaces before validation<br>**6.9** should throw when registration number has more than 10 digits                                  |
| Equipe 11 | **1.8** should call GenerateId when input is valid **(repetido)**<br>**1.10** should call SaveStudent with created student **(repetido)**                            | **4.6** should throw when name contains additional spaces between words<br>**6.8** should throw when registration number has 8 or 9 digits                      |
