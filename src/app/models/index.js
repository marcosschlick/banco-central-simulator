import Sequelize from "sequelize";
import databaseConfig from "../../config/database.cjs";

import Conta from "../models/Conta.js";
import Instituicao from "../models/Instituicao.js";
import Transacao from "../models/Transacao.js";
import Usuario from "../models/Usuario.js";

const models = [Conta, Instituicao, Transacao, Usuario];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => model.init(this.connection));
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
