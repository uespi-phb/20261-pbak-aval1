# Cadastro de Estudante

Exercício backend em TypeScript para implementar o `RegisterStudentUseCase` com fronteiras de Clean Architecture.

O projeto modela um fluxo simplificado de cadastro acadêmico de estudantes. Ele valida os dados do estudante, impede duplicidade de e-mail e matrícula, cria um estudante ativo e persiste esse estudante por meio de abstrações da camada de aplicação.

## Escopo

Implementado:

- value objects `Name`, `Email` e `RegistrationNumber`
- objeto de domínio `Student`
- `RegisterStudentUseCase`
- interfaces de aplicação:
  - `LoadStudentByEmail`
  - `LoadStudentByRegistrationNumber`
  - `SaveStudent`
  - `GenerateId`
- lista de testes sugeridos para exercício em sala

Não implementado:

- `PostgresStudentRepository`
- `UUIDGeneratorAdapter`
- REST API
- autenticação ou autorização
- integração com banco de dados real
- testes automatizados

## Regras de Negócio

`Name`:

- aplica `trim` no valor de entrada
- deve possuir pelo menos 2 palavras
- deve possuir pelo menos 5 caracteres
- não pode possuir espaços adicionais entre as palavras

`Email`:

- aplica `trim` e converte o valor de entrada para minúsculas
- deve possuir formato de e-mail válido

`RegistrationNumber`:

- aplica `trim` no valor de entrada
- deve conter apenas dígitos numéricos
- deve possuir 7 ou 10 dígitos
- não pode conter espaços

Cadastro de estudante:

- o e-mail deve ser único
- a matrícula deve ser única
- todo estudante criado inicia com status `active`

## Arquitetura

O código é organizado por feature:

```txt
src/
  register-student/
    domain/
      email.ts
      name.ts
      registration-number.ts
      student.ts
    application/
      generate-id.ts
      load-student-by-email.ts
      load-student-by-registration-number.ts
      register-student-dtos.ts
      register-student-use-case.ts
      save-student.ts
  usecase.ts
```

Responsabilidades das camadas:

- `domain`: conceitos de negócio e regras de validação.
- `application`: orquestração de caso de uso e interfaces de fronteira.
- `infra`: ausente intencionalmente neste exercício.

As dependências apontam para dentro por meio de abstrações. O caso de uso recebe todas as capacidades externas por injeção via construtor, sem biblioteca de DI.

## Documentação

- Requisitos do produto: `docs/prd-system.md`
- Diagrama de dependências: `docs/register-student.drawio`
- Testes sugeridos: `docs/register-student-tests.md`

## Requisitos

- Node.js `>=24.15 <25`
- Corepack habilitado
- Yarn `4.13.0`

## Instalação

```bash
corepack enable
yarn install
```

## Comandos

```bash
yarn type:check
yarn lint
yarn test
yarn check
```

Use exclusivamente `yarn` para comandos do repositório.

## Exercício de Testes

Os testes automatizados não foram implementados intencionalmente. Os casos de teste sugeridos estão listados em `docs/register-student-tests.md` para que os estudantes implementem como parte do exercício.
