# TypeScript Setup

Template profissional para projetos **Node.js + TypeScript** com foco em:

- TypeScript estrito
- Node.js moderno com suporte nativo a TypeScript apagável
- ESM com `NodeNext`
- alias interno oficial via `package.json#imports`
- ESLint Flat Config
- Prettier
- Vitest
- Husky
- lint-staged
- validação de commit message
- integração com VS Code
- build para produção
- GitHub Actions
- suporte a Codex com `AGENTS.md`

## Objetivo

Este repositório fornece uma base reutilizável para projetos TypeScript com Node.js, organizada para oferecer:

- padronização de código
- validação automática de qualidade
- experiência consistente no VS Code
- pipeline simples para desenvolvimento, testes e build
- baixo acoplamento a ferramentas externas desnecessárias

## Requisitos

- Node.js **24.15+**
- Corepack habilitado
- Yarn **4+**

## Instalação

```bash
git clone git@github.com:uespi-setups/typescript.git
cd typescript
corepack enable
yarn install
```
