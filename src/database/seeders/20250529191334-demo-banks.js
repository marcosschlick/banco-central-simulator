export default {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "banks",
      [
        {
          agency_code: "0001", // Mantido conforme original
          name: "Banco Inter",
          logo_url: "/logo_inter.png", // Caminho para a imagem pública
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
