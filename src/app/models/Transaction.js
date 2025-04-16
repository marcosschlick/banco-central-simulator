import { Sequelize, Model } from "sequelize";

class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: Sequelize.ENUM("debit", "credit"),
          allowNull: false,
        },
        amount: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: false,
          validate: { min: 0.01 },
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        modelName: "Transaction",
        tableName: "transactions",
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Account, {
      foreignKey: "origin_account_id",
      as: "origin",
    });

    this.belongsTo(models.Account, {
      foreignKey: "destination_account_id",
      as: "destination",
    });
  }
}

export default Transaction;
