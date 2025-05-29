import { Sequelize, Model } from "sequelize";

class Account extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        balance: {
          type: Sequelize.DECIMAL,
          defaultValue: 0,
          allowNull: false,
        },
        account_number: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "Account",
        tableName: "accounts",
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });

    this.belongsTo(models.Bank, {
      foreignKey: "bank_id",
      as: "bank",
    });

    this.hasMany(models.Transaction, {
      foreignKey: "account_id",
      as: "transactions",
    });
  }
}

export default Account;
