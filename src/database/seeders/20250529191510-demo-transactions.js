export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          amount: 100.0,
          account_id: 1, // João Almeida
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          amount: 200.0,
          account_id: 2, // Maria de Freitas
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          amount: 300.0,
          account_id: 3, // Gabriel Macedo
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          amount: 150.0,
          account_id: 4, // Fernanda da Silva
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          amount: 250.0,
          account_id: 5, // Rodrigo Caetano
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          amount: 350.0,
          account_id: 6, // Renato Gaúcho
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          amount: 450.0,
          account_id: 7, // Mazembe Mundial
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
