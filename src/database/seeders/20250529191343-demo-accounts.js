export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "accounts",
      [
        {
          balance: 1500.0,
          account_number: "12345-6",
          user_id: 1, // João Silva
          bank_id: 1, // Banco Inter
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          balance: 2500.0,
          account_number: "23456-7",
          user_id: 2, // Maria Souza
          bank_id: 1, // Banco Inter
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          balance: 3500.0,
          account_number: "34567-8",
          user_id: 3, // Carlos Oliveira
          bank_id: 1, // Banco Inter
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("accounts", null, {});
  },
};
