export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "banks",
      [
        {
          agency_code: "0001",
          name: "Banco Inter",
          logo_url: "https://www.bancointer.com.br/logo.png",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("banks", null, {});
  },
};
