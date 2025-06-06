export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "João Almeida",
          cpf: "12345678901",
          email: "conta1@teste.com",
          birth_date: new Date("1990-01-15"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Maria de Freitas",
          cpf: "12345678902",
          email: "conta2@teste.com",
          birth_date: new Date("1985-05-22"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Gabriel Macedo",
          cpf: "12345678906",
          email: "conta6@teste.com",
          birth_date: new Date("1995-11-30"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fernanda da Silva",
          cpf: "12345678907",
          email: "conta7@teste.com",
          birth_date: new Date("1992-03-10"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Rodrigo Caetano",
          cpf: "12345678908",
          email: "conta8@teste.com",
          birth_date: new Date("1988-07-19"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Renato Gaúcho",
          cpf: "12345678909",
          email: "conta9@teste.com",
          birth_date: new Date("1975-09-25"),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Mazembe Mundial",
          cpf: "12345678910",
          email: "conta10@teste.com",
          birth_date: new Date("1998-12-05"),
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
