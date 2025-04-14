import Usuario from "../../models/Usuario.js";

export default async function seedUsuarios() {
  const usuarios = [
    {
      id: "aa00bb11-cc22-4d33-8e44-ff55aa66bb77",
      cpf: "52998224725",
      nome: "João Silva",
    },
    {
      id: "bb11cc22-dd33-4e44-9f55-00aabbccdd88",
      cpf: "61835322704",
      nome: "Maria Souza",
    },
    {
      id: "cc22dd33-ee44-4f55-0a66-11bbccddee99",
      cpf: "38401675807",
      nome: "Pedro Oliveira",
    },
    {
      id: "dd33ee44-ff55-4066-1b77-22ccddeeff00",
      cpf: "74689231134",
      nome: "Ana Costa",
    },
    {
      id: "ee44ff55-0066-4177-2c88-33ddeeff0011",
      cpf: "02351846990",
      nome: "Carlos Santos",
    },
    {
      id: "ff550066-1177-4288-3d99-44eeff001122",
      cpf: "15723890461",
      nome: "Laura Pereira",
    },
    {
      id: "00661177-2288-4399-4eaa-55ff00112233",
      cpf: "83042517963",
      nome: "Lucas Ferreira",
    },
    {
      id: "11772288-3399-44aa-5fbb-660011223344",
      cpf: "49276158030",
      nome: "Mariana Alves",
    },
    {
      id: "22883399-44aa-55bb-60cc-770122334455",
      cpf: "96503412872",
      nome: "Paulo Ribeiro",
    },
    {
      id: "339944aa-55bb-66cc-71dd-882233445566",
      cpf: "31849760521",
      nome: "Fernanda Lima",
    },
    {
      id: "44aa55bb-66cc-77dd-82ee-993344556677",
      cpf: "20483659714",
      nome: "Rafael Martins",
    },
    {
      id: "55bb66cc-77dd-88ee-93ff-aa4556677889",
      cpf: "67192548305",
      nome: "Juliana Cardoso",
    },
    {
      id: "66cc77dd-88ee-99ff-a000-bb566778899a",
      cpf: "85362019478",
      nome: "Marcos Gonçalves",
    },
    {
      id: "77dd88ee-99ff-aa00-b111-cc6778899aab",
      cpf: "42758130692",
      nome: "Patrícia Rocha",
    },
    {
      id: "88ee99ff-aa00-bb11-c222-dd78899aabbc",
      cpf: "79031245863",
      nome: "Daniel Barbosa",
    },
    {
      id: "99ffaa00-bb11-cc22-d333-ee899aabbccd",
      cpf: "13579246801",
      nome: "Camila Dias",
    },
    {
      id: "aa00bb11-cc22-dd33-e444-ff9aabbccdde",
      cpf: "24680135792",
      nome: "Gustavo Nunes",
    },
    {
      id: "bb11cc22-dd33-ee44-f555-00abbccddeef",
      cpf: "90817263540",
      nome: "Amanda Moreira",
    },
    {
      id: "cc22dd33-ee44-ff55-0666-11bccddeeff0",
      cpf: "57648132095",
      nome: "Roberto Teixeira",
    },
    {
      id: "dd33ee44-ff55-0077-1777-22cddeeff001",
      cpf: "68904321587",
      nome: "Tatiane Carvalho",
    },
  ];

  await Usuario.bulkCreate(usuarios);
  console.log("Seed de Usuários criado!");
}
