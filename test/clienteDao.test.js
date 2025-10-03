const ClienteDao = require("../clienteDao");

beforeEach(async () => {
  await ClienteDao.limpar();
});

test("Deve cadastrar cliente com sucesso", async () => {
  const cliente = await ClienteDao.salvar("Beatriz", "bia@email.com");
  expect(cliente).toHaveProperty("id");
  expect(cliente.nome).toBe("Beatriz");
});

test("Não deve cadastrar cliente sem nome", async () => {
  await expect(ClienteDao.salvar("", "email@email.com"))
    .rejects.toThrow("Nome e email obrigatórios");
});

test("Listagem deve retornar todos os clientes", async () => {
  await ClienteDao.salvar("Beatriz", "bia@email.com");
  await ClienteDao.salvar("Carlos", "carlos@email.com");

  const lista = await ClienteDao.listar();
  expect(lista.length).toBe(2);
  expect(lista[1].nome).toBe("Carlos");
});
