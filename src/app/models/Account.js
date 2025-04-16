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
          type: Sequelize.DECIMAL(15, 2),
          defaultValue: 0,
          allowNull: false,
          validate: { min: 0 },
        },
        credit_limit: {
          type: Sequelize.DECIMAL(15, 2),
          defaultValue: 0,
          allowNull: false,
          validate: { min: 0 },
        },
        credit_available: {
          type: Sequelize.DECIMAL(15, 2),
          defaultValue: 0,
          allowNull: false,
          validate: { min: 0 },
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

    this.belongsTo(models.Institution, {
      foreignKey: "institution_id",
      as: "institution",
    });

    this.hasMany(models.Transaction, {
      foreignKey: "origin_account_id",
      as: "outgoing_transactions",
    });

    this.hasMany(models.Transaction, {
      foreignKey: "destination_account_id",
      as: "incoming_transactions",
    });
  }
}

export default Account;
