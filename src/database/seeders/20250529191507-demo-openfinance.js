export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "open_finance",
      [
        {
          status: true,
          expiration: true,
          expiration_date: new Date("2025-12-31"),
          account_id: 1, // Conta do João
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          status: false,
          expiration: false,
          expiration_date: null,
          account_id: 2, // conta da Maria
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          status: true,
          expiration: true,
          expiration_date: new Date("2026-01-15"),
          account_id: 3, // conta do Carlos
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("open_finance", null, {});
  },
};
