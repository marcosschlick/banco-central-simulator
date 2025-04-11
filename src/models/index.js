import sequelize from "../config/database.js";
import Usuario from "./Usuario.js";
import Instituicao from "./Instituicao.js";
import Conta from "./Conta.js";
import Transacao from "./Transacao.js";

const models = {
  Usuario,
  Instituicao,
  Conta,
  Transacao,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

const db = {
  sequelize,
  Sequelize: sequelize.Sequelize,
  ...models,
};

export default db;
