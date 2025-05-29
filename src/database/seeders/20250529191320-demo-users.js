export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          cpf: "12345678901",
          name: "João Silva",
          email: "joao@email.com",
          birth_date: new Date("1990-01-15"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cpf: "23456789012",
          name: "Maria Souza",
          email: "maria@email.com",
          birth_date: new Date("1985-05-22"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          cpf: "34567890123",
          name: "Carlos Oliveira",
          email: "carlos@email.com",
          birth_date: new Date("1995-11-30"),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
