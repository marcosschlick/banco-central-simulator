import Sequelize from "sequelize";
import databaseConfig from "../config/database.cjs";

import User from "../app/models/User.js";
import Bank from "../app/models/Bank.js";
import Account from "../app/models/Account.js";
import OpenFinanceAuthorization from "../app/models/OpenFinanceAuthorization.js";
import Transaction from "../app/models/Transaction.js";

const models = [User, Bank, Account, OpenFinanceAuthorization, Transaction];

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
