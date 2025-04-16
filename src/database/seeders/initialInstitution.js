import Institution from "../../app/models/Institution.js";

export default async function seedInstitutions() {
  const institutions = [
    { id: 1, code: "001", name: "Banco do Brasil" },
    { id: 2, code: "033", name: "Banco Santander" },
    { id: 3, code: "104", name: "Caixa Econômica Federal" },
    { id: 4, code: "237", name: "Banco Bradesco" },
    { id: 5, code: "341", name: "Banco Itaú" },
    { id: 6, code: "077", name: "Banco Inter" },
    { id: 7, code: "041", name: "Banrisul" },
    { id: 8, code: "748", name: "Sicob" },
    { id: 9, code: "260", name: "Nubank" },
    { id: 10, code: "336", name: "Banco C6" },
  ];

  await Institution.bulkCreate(institutions);
  console.log("Institution seed created!");
}
