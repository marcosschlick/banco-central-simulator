import User from "../../app/models/User.js";

export default async function seedUsers() {
  const users = [
    { cpf: "52998224725", name: "João Silva" },
    { cpf: "61835322704", name: "Maria Souza" },
    { cpf: "38401675807", name: "Pedro Oliveira" },
    { cpf: "74689231134", name: "Ana Costa" },
    { cpf: "02351846990", name: "Carlos Santos" },
    { cpf: "15723890461", name: "Laura Pereira" },
    { cpf: "83042517963", name: "Lucas Ferreira" },
    { cpf: "49276158030", name: "Mariana Alves" },
    { cpf: "96503412872", name: "Paulo Ribeiro" },
    { cpf: "31849760521", name: "Fernanda Lima" },
    { cpf: "20483659714", name: "Rafael Martins" },
    { cpf: "67192548305", name: "Juliana Cardoso" },
    { cpf: "85362019478", name: "Marcos Gonçalves" },
    { cpf: "42758130692", name: "Patrícia Rocha" },
    { cpf: "79031245863", name: "Daniel Barbosa" },
    { cpf: "13579246801", name: "Camila Dias" },
    { cpf: "24680135792", name: "Gustavo Nunes" },
    { cpf: "90817263540", name: "Amanda Moreira" },
    { cpf: "57648132095", name: "Roberto Teixeira" },
    { cpf: "68904321587", name: "Tatiane Carvalho" },
    { cpf: "00000000000", name: "User Tester" },
  ];

  await User.bulkCreate(users);
  console.log("User seed created!");
}
