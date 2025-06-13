export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "accounts",
      [
        {
          balance: 15000.0,
          account_number: "00458231", // João Almeida
          user_id: 1,
          bank_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          balance: 15000.0,
          account_number: "84736291", // Maria de Freitas
          user_id: 2,
          bank_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          balance: 15000.0,
          account_number: "52389364", // Gabriel Macedo
          user_id: 3,
          bank_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          balance: 15000.0,
          account_number: "66987415", // Fernanda da Silva
          user_id: 4,
          bank_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          balance: 15000.0,
          account_number: "98466513", // Rodrigo Caetano
          user_id: 5,
          bank_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          balance: 15000.0,
          account_number: "84956671", // Renato Gaúcho
          user_id: 6,
          bank_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          balance: 15000.0,
          account_number: "69442561", // Mazembe Mundial
          user_id: 7,
          bank_id: 1,
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
