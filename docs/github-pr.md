# Tutorial Pull Request

## O que é um Pull Request

Um **Pull Request (PR)** é uma solicitação para que alterações feitas em uma **branch** sejam analisadas e incorporadas à branch principal do repositório, que neste caso é a **`main`**.

Em termos simples:

- o time faz o trabalho em uma branch própria
- envia essa branch para o GitHub
- abre um PR pedindo a integração na `main`

## Fluxo recomendado

### 1. Atualizar a barnch `main`

Antes de começar:

```bash
git checkout main
git pull origin main
```

### 2. Criar uma branch do time

Nunca trabalhe diretamente na `main`.

```bash
git checkout -b tests/teamXX
```

## 3. Implementar os testes

Faça as alterações pedidas na atividade e confira o resultado localmente.

## 4. Verificar os arquivos alterados

```bash
git status
```

## 5. Adicionar e registrar as alterações

```bash
git add .
git commit -m "test(register-student): implement assigned tests for team 99"
```

A mensagem do commit deve ser clara e indicar o que foi feito.

## 6. Enviar a branch para o GitHub

```bash
git push -u origin tests/teamXX
```

## 7. Abrir o Pull Request no GitHub

Depois do push:

- acesse o repositório no GitHub
- clique em **Compare & pull request**
  ou vá em **Pull requests > New pull request**
- confira se:
  - a **base** é `main`
  - a **compare** é a branch do time

## 8. Preencher o PR

Use um título objetivo, por exemplo:

`Implement tests assigned to Team 05`

Na descrição, informe resumidamente o que foi implementado.

Exemplo:

```md
Implemented the test cases assigned to Team 05.

Included:

- success scenarios
- validation scenarios
- dependency interaction tests
```

## 9. Revisar antes de criar

Antes de clicar em **Create pull request**, verifique:

- se a branch de destino é `main`
- se só há alterações do escopo da atividade
- se o código está correto
- se o título e a descrição estão claros

## Resumo final

O fluxo essencial é este:

1. atualizar a `main`
2. criar uma branch própria
3. implementar os testes
4. fazer commit
5. fazer push
6. abrir o PR para a `main`

## Exemplo completo

```bash
git checkout main
git pull origin main
git checkout -b team-05-tests

git add .
git commit -m "test(register-student): implement assigned tests for team 05"
git push -u origin team-05-tests
```

Depois disso, o restante é feito pela interface do GitHub.
