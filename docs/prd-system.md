# PRD - RegisterStudentUseCase

## 1. Visão geral do sistema

O sistema é uma aplicação backend simplificada para gerenciamento acadêmico de estudantes.

Seu objetivo é permitir o registro de estudantes em uma base institucional, garantindo que os dados mínimos sejam válidos, que não haja duplicidade de matrícula ou e-mail e que o estudante seja criado em estado ativo.

Este PRD descreve apenas o caso de uso `RegisterStudentUseCase`.

---

## 2. Objetivo do caso de uso

Permitir o cadastro de um novo estudante no sistema acadêmico.

Ao final da execução, o sistema deve:

- validar os dados recebidos
- impedir cadastro duplicado
- criar um estudante ativo
- persistir o estudante por meio de um repositório
- retornar os dados básicos do estudante criado

---

## 3. Ator principal

**Servidor acadêmico**

Representa o usuário responsável por registrar estudantes no sistema.

Para esta avaliação, não é necessário implementar autenticação, autorização ou interface HTTP.

---

## 4. Escopo

### Incluído

O caso de uso deve contemplar:

- cadastro de estudante
- validação de nome
- validação de e-mail
- validação de matrícula
- verificação de duplicidade por e-mail
- verificação de duplicidade por matrícula
- criação do estudante com status ativo
- persistência via abstração de repositório

### Fora do escopo

Não devem ser implementados:

- banco de dados real
- API REST
- autenticação
- autorização
- criptografia
- envio de e-mail
- interface gráfica
- atualização de estudante
- remoção de estudante
- matrícula em disciplinas

---

## 5. Dados de entrada

O caso de uso deve receber:

| Campo                | Tipo     | Obrigatório | Descrição                        |
| -------------------- | -------- | ----------: | -------------------------------- |
| `name`               | `string` |         Sim | Nome completo do estudante       |
| `email`              | `string` |         Sim | E-mail institucional ou pessoal  |
| `registrationNumber` | `string` |         Sim | Número de matrícula do estudante |

---

## 6. Dados de saída

Em caso de sucesso, o caso de uso deve retornar:

| Campo                | Tipo     | Descrição                         |
| -------------------- | -------- | --------------------------------- |
| `id`                 | `string` | Identificador do estudante criado |
| `name`               | `string` | Nome do estudante                 |
| `email`              | `string` | E-mail do estudante               |
| `registrationNumber` | `string` | Matrícula do estudante            |
| `status`             | `string` | Deve ser `active`                 |

---

## 7. Regras de negócio

### RN01 - Nome obrigatório

O nome do estudante deve ser informado.

Um nome ausente, vazio ou composto apenas por espaços deve ser rejeitado.

O objeto `Name` pode aplicar `trim` na string de entrada antes das validações.

### RN02 - Nome válido

Após a normalização com `trim`, o nome do estudante deve:

- possuir pelo menos 2 palavras
- possuir comprimento mínimo de 5 caracteres
- não conter espaços adicionais entre as palavras

Exemplos válidos:

- `Ana Maria`
- `João Silva`
- `Luis Alberto`

Exemplos inválidos:

- `Ana`
- `A B`
- `João  Silva`
- `   `

### RN03 - E-mail obrigatório

O e-mail deve ser informado.

### RN04 - E-mail válido

O e-mail deve possuir formato válido.

Exemplo válido:

- `student@example.com`

Exemplos inválidos:

- `student`
- `student@`
- `student.com`

### RN05 - Matrícula obrigatória

A matrícula deve ser informada.

Um valor ausente, vazio ou composto apenas por espaços deve ser rejeitado.

O objeto `RegistrationNumber` pode aplicar `trim` na string de entrada antes das validações.

### RN06 - Matrícula válida

Após a normalização com `trim`, a matrícula deve:

- ser composta apenas por dígitos numéricos
- possuir 7 ou 10 dígitos
- não conter espaços

Exemplos válidos:

- `1234567`
- `2026000001`

Exemplos inválidos:

- `ABC1234`
- `123 4567`
- `123456`
- `12345678`
- `123456789`
- `12345678901`

### RN07 - E-mail único

Não deve ser permitido cadastrar dois estudantes com o mesmo e-mail.

### RN08 - Matrícula única

Não deve ser permitido cadastrar dois estudantes com a mesma matrícula.

### RN09 - Status inicial

Todo estudante criado deve iniciar com status `active`.

---

## 8. Fluxo principal

1. O caso de uso recebe `name`, `email` e `registrationNumber`.
2. O sistema normaliza `name` e `registrationNumber` com `trim`, quando aplicável.
3. O sistema valida os dados obrigatórios.
4. O sistema valida o formato do nome.
5. O sistema valida o formato do e-mail.
6. O sistema valida o formato da matrícula.
7. O sistema verifica se já existe estudante com o mesmo e-mail.
8. O sistema verifica se já existe estudante com a mesma matrícula.
9. O sistema cria um novo estudante com status `active`.
10. O sistema persiste o estudante.
11. O sistema retorna os dados do estudante criado.

---

## 9. Fluxos de exceção

### FE01 - Nome inválido

Se o nome for inválido, o caso de uso deve lançar erro de nome inválido.

Deve ser considerado inválido, entre outros casos, quando:

- estiver vazio após `trim`
- possuir menos de 2 palavras
- possuir menos de 5 caracteres
- contiver espaços adicionais entre as palavras

### FE02 - E-mail inválido

Se o e-mail for inválido, o caso de uso deve lançar erro de e-mail inválido.

### FE03 - Matrícula inválida

Se a matrícula for inválida, o caso de uso deve lançar erro de matrícula inválida.

Deve ser considerada inválida, entre outros casos, quando:

- estiver vazia após `trim`
- contiver caracteres não numéricos
- contiver espaços
- não possuir 7 nem 10 dígitos

### FE04 - E-mail já cadastrado

Se já existir estudante com o mesmo e-mail, o caso de uso deve lançar erro de e-mail duplicado.

### FE05 - Matrícula já cadastrada

Se já existir estudante com a mesma matrícula, o caso de uso deve lançar erro de matrícula duplicada.

---

## 10. Requisitos técnicos esperados

A implementação deve:

- usar TypeScript em modo strict
- organizar o código com separação entre domínio e aplicação
- implementar o caso de uso como classe
- depender de abstração de repositório, não de implementação concreta
- permitir testes automatizados
- evitar banco de dados real
- evitar dependências externas desnecessárias
- manter o código simples e legível

---

## 11. Abstração esperada de repositório

O caso de uso deve depender das interfaces declaradas na camada de aplicação.

```ts
// src/register-student/application/load-student-by-email.ts
import type { Email } from '#src/register-student/domain/email'
import type { Student } from '#src/register-student/domain/student'

export interface LoadStudentByEmail {
  loadByEmail: (email: Email) => Promise<Student | null>
}
```

```ts
// src/register-student/application/load-student-by-registration-number.ts
import type { RegistrationNumber } from '#src/register-student/domain/registration-number'
import type { Student } from '#src/register-student/domain/student'

export interface LoadStudentByRegistrationNumber {
  loadByRegistrationNumber: (registrationNumber: RegistrationNumber) => Promise<Student | null>
}
```

```ts
// src/register-student/application/save-student.ts
import type { Student } from '#src/register-student/domain/student'

export interface SaveStudent {
  save: (student: Student) => Promise<void>
}
```

```ts
// src/register-student/application/generate-id.ts
export interface GenerateId {
  generate: () => string
}
```

```ts
// src/register-student/application/register-student-dtos.ts
import type { StudentStatus } from '#src/register-student/domain/student'

export interface RegisterStudentInput {
  name: string
  email: string
  registrationNumber: string
}

export interface RegisterStudentOutput {
  id: string
  name: string
  email: string
  registrationNumber: string
  status: StudentStatus
}
```

```ts
// src/usecase.ts
export interface UseCase<Input, Output> {
  execute: (input: Input) => Promise<Output>
}
```
