import { Sequelize, Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        cpf: {
          type: Sequelize.STRING(11),
          allowNull: false,
          unique: true,
          validate: { len: [11, 11] },
        },
        name: {
          type: Sequelize.STRING(100),
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

export default User;
