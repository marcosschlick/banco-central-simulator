import { Sequelize, Model } from "sequelize";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        cpf: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: { len: [11, 11] },
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        birth_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Account, {
      foreignKey: "user_id",
      as: "accounts",
    });
  }
}
