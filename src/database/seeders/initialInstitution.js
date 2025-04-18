import Institution from "../../app/models/Institution.js";

export default async function seedInstitutions() {
  const institutions = [
    { code: "001", name: "Banco do Brasil" },
    { code: "033", name: "Banco Santander" },
    { code: "104", name: "Caixa Econômica Federal" },
    { code: "237", name: "Banco Bradesco" },
    { code: "341", name: "Banco Itaú" },
    { code: "077", name: "Banco Inter" },
    { code: "041", name: "Banrisul" },
    { code: "748", name: "Sicob" },
    { code: "260", name: "Nubank" },
    { code: "336", name: "Banco C6" },
  ];

  await Institution.bulkCreate(institutions);
  console.log("Institution seed created!");
}
