import { Sequelize, Model } from "sequelize";

class OpenFinanceAuthorization extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        expiration_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "OpenFinanceAuthorization",
        tableName: "open_finance_authorizations",
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

export default OpenFinanceAuthorization;
