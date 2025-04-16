import User from "../../app/models/User.js";

export default async function seedUsers() {
  const users = [
    { id: 1, cpf: "52998224725", name: "João Silva" },
    { id: 2, cpf: "61835322704", name: "Maria Souza" },
    { id: 3, cpf: "38401675807", name: "Pedro Oliveira" },
    { id: 4, cpf: "74689231134", name: "Ana Costa" },
    { id: 5, cpf: "02351846990", name: "Carlos Santos" },
    { id: 6, cpf: "15723890461", name: "Laura Pereira" },
    { id: 7, cpf: "83042517963", name: "Lucas Ferreira" },
    { id: 8, cpf: "49276158030", name: "Mariana Alves" },
    { id: 9, cpf: "96503412872", name: "Paulo Ribeiro" },
    { id: 10, cpf: "31849760521", name: "Fernanda Lima" },
    { id: 11, cpf: "20483659714", name: "Rafael Martins" },
    { id: 12, cpf: "67192548305", name: "Juliana Cardoso" },
    { id: 13, cpf: "85362019478", name: "Marcos Gonçalves" },
    { id: 14, cpf: "42758130692", name: "Patrícia Rocha" },
    { id: 15, cpf: "79031245863", name: "Daniel Barbosa" },
    { id: 16, cpf: "13579246801", name: "Camila Dias" },
    { id: 17, cpf: "24680135792", name: "Gustavo Nunes" },
    { id: 18, cpf: "90817263540", name: "Amanda Moreira" },
    { id: 19, cpf: "57648132095", name: "Roberto Teixeira" },
    { id: 20, cpf: "68904321587", name: "Tatiane Carvalho" },
    { id: 21, cpf: "00000000000", name: "User Tester" },
  ];

  await User.bulkCreate(users);
  console.log("User seed created!");
}
