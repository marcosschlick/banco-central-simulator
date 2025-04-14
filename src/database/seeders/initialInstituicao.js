import Instituicao from "../../models/Instituicao.js";

export default async function seedInstituicoes() {
  const instituicoes = [
    {
      id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      codigo: "001",
      nome: "Banco do Brasil",
    },
    {
      id: "b1ffc1d4-9124-4c1f-9c6d-7bb9bd380a12",
      codigo: "033",
      nome: "Banco Santander",
    },
    {
      id: "c2eedc22-a345-4def-8c7d-8cc9bd380a13",
      codigo: "104",
      nome: "Caixa Econômica Federal",
    },
    {
      id: "d3ffd333-b456-4eef-9d7e-9dd9bd380a14",
      codigo: "237",
      nome: "Banco Bradesco",
    },
    {
      id: "e4eeec44-c567-4f0f-ae8f-0ee9bd380a15",
      codigo: "341",
      nome: "Banco Itaú",
    },
    {
      id: "f5fffd55-d678-401f-bf90-1ff9bd380a16",
      codigo: "077",
      nome: "Banco Inter",
    },
    {
      id: "a6eeec66-e789-412f-c0a1-2cc9bd380a17",
      codigo: "041",
      nome: "Banrisul",
    },
    {
      id: "b7fffd77-f89a-423f-d1b2-3dd9bd380a18",
      codigo: "748",
      nome: "Sicob",
    },
    {
      id: "c8eeec88-09ab-434f-e2c3-4ee9bd380a19",
      codigo: "260",
      nome: "Nu Pagamentos (Nubank)",
    },
    {
      id: "d9fffd99-1abc-445f-f3d4-5ff9bd380a20",
      codigo: "336",
      nome: "Banco C6",
    },
  ];

  await Instituicao.bulkCreate(instituicoes);
  console.log("Seed de Instituições criado!");
}
