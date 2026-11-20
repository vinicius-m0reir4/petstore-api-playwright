# PetStore API Testing - Playwright

Projeto desenvolvido para a Atividade 07, com o objetivo de automatizar testes de API da entidade **User** da Swagger PetStore utilizando JavaScript e Playwright.

## Tecnologias
- JavaScript
- Node.js
- Playwright

## API
https://petstore.swagger.io/v2

## Cenários automatizados

| Método | Operação |
|---|---|
| POST | Criar usuário |
| GET | Consultar usuário |
| PUT | Atualizar usuário |
| GET | Validar atualização |
| DELETE | Excluir usuário |
| GET | Validar exclusão |

## Executar o projeto

Instalar as dependências:

```bash
npm install
```

Executar os testes:

```bash
npx playwright test
```