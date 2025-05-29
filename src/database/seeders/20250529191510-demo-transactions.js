export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          amount: 100.0,
          account_id: 1, // conta do João
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          amount: 200.0,
          account_id: 2, // conta da Maria
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          amount: 300.0,
          account_id: 3, // conta do Carlos
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
