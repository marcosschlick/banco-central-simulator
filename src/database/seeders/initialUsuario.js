import Usuario from "../../models/Usuario.js";

export default async function seedUsuarios() {
  const usuarios = [
    { id: 1, cpf: "52998224725", nome: "João Silva" },
    { id: 2, cpf: "61835322704", nome: "Maria Souza" },
    { id: 3, cpf: "38401675807", nome: "Pedro Oliveira" },
    { id: 4, cpf: "74689231134", nome: "Ana Costa" },
    { id: 5, cpf: "02351846990", nome: "Carlos Santos" },
    { id: 6, cpf: "15723890461", nome: "Laura Pereira" },
    { id: 7, cpf: "83042517963", nome: "Lucas Ferreira" },
    { id: 8, cpf: "49276158030", nome: "Mariana Alves" },
    { id: 9, cpf: "96503412872", nome: "Paulo Ribeiro" },
    { id: 10, cpf: "31849760521", nome: "Fernanda Lima" },
    { id: 11, cpf: "20483659714", nome: "Rafael Martins" },
    { id: 12, cpf: "67192548305", nome: "Juliana Cardoso" },
    { id: 13, cpf: "85362019478", nome: "Marcos Gonçalves" },
    { id: 14, cpf: "42758130692", nome: "Patrícia Rocha" },
    { id: 15, cpf: "79031245863", nome: "Daniel Barbosa" },
    { id: 16, cpf: "13579246801", nome: "Camila Dias" },
    { id: 17, cpf: "24680135792", nome: "Gustavo Nunes" },
    { id: 18, cpf: "90817263540", nome: "Amanda Moreira" },
    { id: 19, cpf: "57648132095", nome: "Roberto Teixeira" },
    { id: 20, cpf: "68904321587", nome: "Tatiane Carvalho" },
    { id: 21, cpf: "00000000000", nome: "User Tester" },
  ];

  await Usuario.bulkCreate(usuarios);
  console.log("Seed de Usuários criado!");
}
