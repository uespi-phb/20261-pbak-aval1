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
|----------------------|----------|-------------|----------------------------------|
| `name`               | `string` | Sim         | Nome completo do estudante       |
| `email`              | `string` | Sim         | E-mail institucional ou pessoal  |
| `registrationNumber` | `string` | Sim         | Número de matrícula do estudante |

---

## 6. Dados de saída

Em caso de sucesso, o caso de uso deve retornar:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `string` | Identificador do estudante criado |
| `name` | `string` | Nome do estudante |
| `email` | `string` | E-mail do estudante |
| `registrationNumber` | `string` | Matrícula do estudante |
| `status` | `string` | Deve ser `active` |

---

## 7. Regras de negócio

### RN01 - Nome obrigatório

O nome do estudante deve ser informado.

Um nome vazio, composto apenas por espaços ou ausente deve ser rejeitado.

### RN02 - Nome mínimo

O nome deve possuir pelo menos 3 caracteres úteis.

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

### RN06 - Formato da matrícula

A matrícula deve conter exatamente 8 dígitos numéricos.

Exemplo válido:

- `20260001`

Exemplos inválidos:

- `ABC12345`
- `20261`
- `202600001`

### RN07 - E-mail único

Não deve ser permitido cadastrar dois estudantes com o mesmo e-mail.

### RN08 - Matrícula única

Não deve ser permitido cadastrar dois estudantes com a mesma matrícula.

### RN09 - Status inicial

Todo estudante criado deve iniciar com status `active`.

---

## 8. Fluxo principal

1. O caso de uso recebe `name`, `email` e `registrationNumber`.
2. O sistema valida os dados obrigatórios.
3. O sistema valida o formato do e-mail.
4. O sistema valida o formato da matrícula.
5. O sistema verifica se já existe estudante com o mesmo e-mail.
6. O sistema verifica se já existe estudante com a mesma matrícula.
7. O sistema cria um novo estudante com status `active`.
8. O sistema persiste o estudante.
9. O sistema retorna os dados do estudante criado.

---

## 9. Fluxos de exceção

### FE01 - Nome inválido

Se o nome for inválido, o caso de uso deve lançar erro de nome inválido.

### FE02 - E-mail inválido

Se o e-mail for inválido, o caso de uso deve lançar erro de e-mail inválido.

### FE03 - Matrícula inválida

Se a matrícula for inválida, o caso de uso deve lançar erro de matrícula inválida.

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

O caso de uso deve depender de uma abstração equivalente a:

```ts
interface StudentRepository {
  findByEmail(email: string): Promise<Student | null>
  findByRegistrationNumber(registrationNumber: string): Promise<Student | null>
  save(student: Student): Promise<void>
}
```
