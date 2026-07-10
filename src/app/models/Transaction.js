import { Sequelize, Model } from "sequelize";

export default class Transaction extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        amount: {
          type: Sequelize.DECIMAL,
          allowNull: false,
          validate: { min: 0.01 },
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
      foreignKey: "account_id",
      as: "account",
    });
  }
}
