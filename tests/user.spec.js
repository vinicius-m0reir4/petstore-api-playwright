
import { test, expect } from '@playwright/test';

// URL principal da API
const BASE_URL = 'https://petstore.swagger.io/v2/';

// Gera um username exclusivo para cada execução
const username = `qa_user_${Date.now()}`;

// ID utilizado no cadastro
const userId = Math.floor(Date.now() / 1000);

// Dados iniciais do usuário
const userData = {
  id: userId,
  username: username,
  firstName: 'Vinicius',
  lastName: 'Moreira',
  email: 'vinicius.qa@example.com',
  password: 'Teste@123',
  phone: '88999999999',
  userStatus: 1
};

// Dados que serão utilizados na atualização
const updatedUserData = {
  ...userData,
  firstName: 'Vinicius Atualizado',
  email: 'vinicius.atualizado@example.com',
  phone: '88988888888'
};

// Contexto de requisições compartilhado pelos testes
let apiContext;

test.describe.serial('Testes de API - User', () => {

  // Preparação antes dos testes
  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });
  });

 // POST - Criar usuário
test('POST - Deve cadastrar um novo usuário', async () => {
  const response = await apiContext.post('user/', {
    data: userData
  });

  const responseText = await response.text();

  console.log('STATUS:', response.status());
  console.log('URL:', response.url());
  console.log('CONTENT-TYPE:', response.headers()['content-type']);
  console.log('RESPOSTA:', responseText.substring(0, 500));

  expect(response.status()).toBe(200);

  const responseBody = JSON.parse(responseText);

  expect(responseBody.code).toBe(200);
});

  // GET - Consultar usuário
  test('GET - Deve consultar o usuário cadastrado', async () => {
    const response = await apiContext.get(`user/${username}`);

    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    expect(responseBody.username).toBe(username);
    expect(responseBody.firstName).toBe('Vinicius');
    expect(responseBody.lastName).toBe('Moreira');
    expect(responseBody.email).toBe('vinicius.qa@example.com');
  });

  // PUT - Atualizar usuário
  test('PUT - Deve atualizar os dados do usuário', async () => {
    const response = await apiContext.put(`user/${username}`, {
      data: updatedUserData
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.code).toBe(200);
  });

  // GET - Validar atualização
  test('GET - Deve apresentar os dados atualizados', async () => {
    const response = await apiContext.get(`user/${username}`);

    const responseBody = await response.json();

    expect(response.status()).toBe(200);

    expect(responseBody.firstName).toBe('Vinicius Atualizado');
    expect(responseBody.email).toBe('vinicius.atualizado@example.com');
    expect(responseBody.phone).toBe('88988888888');
  });

  // DELETE - Excluir usuário
  test('DELETE - Deve excluir o usuário cadastrado', async () => {
    const response = await apiContext.delete(`user/${username}`);

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.code).toBe(200);
  });

  // GET - Validar exclusão
  test('GET - Não deve encontrar o usuário excluído', async () => {
    const response = await apiContext.get(`user/${username}`);

    expect(response.status()).toBe(404);
  });

  // Encerramento do contexto
  test.afterAll(async () => {
    await apiContext.dispose();
  });

});
