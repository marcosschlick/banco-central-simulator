export default {
  up: async (queryInterface) => {
    // Inserir registros manualmente para cada conta
    await queryInterface.bulkInsert(
      "open_finance",
      [
        // João Almeida (conta 1)
        {
          status: true,
          expiration: true,
          expiration_date: new Date("2025-12-31"),
          account_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Maria de Freitas (conta 2)
        {
          status: false,
          expiration: false,
          expiration_date: null,
          account_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Gabriel Macedo (conta 3)
        {
          status: true,
          expiration: true,
          expiration_date: new Date("2026-01-15"),
          account_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Fernanda da Silva (conta 4)
        {
          status: true,
          expiration: true,
          expiration_date: new Date("2025-12-31"),
          account_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Rodrigo Caetano (conta 5)
        {
          status: false,
          expiration: false,
          expiration_date: null,
          account_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Renato Gaúcho (conta 6)
        {
          status: true,
          expiration: true,
          expiration_date: new Date("2026-01-15"),
          account_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        // Mazembe Mundial (conta 7)
        {
          status: true,
          expiration: true,
          expiration_date: new Date("2025-12-31"),
          account_id: 7,
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
