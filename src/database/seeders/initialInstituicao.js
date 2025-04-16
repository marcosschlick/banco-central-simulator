import Instituicao from "../../models/Instituicao.js";

export default async function seedInstituicoes() {
  const instituicoes = [
    { id: 1, codigo: "001", nome: "Banco do Brasil" },
    { id: 2, codigo: "033", nome: "Banco Santander" },
    { id: 3, codigo: "104", nome: "Caixa Econômica Federal" },
    { id: 4, codigo: "237", nome: "Banco Bradesco" },
    { id: 5, codigo: "341", nome: "Banco Itaú" },
    { id: 6, codigo: "077", nome: "Banco Inter" },
    { id: 7, codigo: "041", nome: "Banrisul" },
    { id: 8, codigo: "748", nome: "Sicob" },
    { id: 9, codigo: "260", nome: "Nubank" },
    { id: 10, codigo: "336", nome: "Banco C6" },
  ];

  await Instituicao.bulkCreate(instituicoes);
  console.log("Seed de Instituições criado!");
}
