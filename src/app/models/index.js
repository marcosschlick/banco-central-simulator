import Sequelize from "sequelize";
import databaseConfig from "../../config/database.cjs";

import Account from "./Account.js";
import Institution from "./Institution.js";
import Transaction from "./Transaction.js";
import User from "./User.js";

const models = [Account, Institution, Transaction, User];

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
