import { Sequelize, Model } from "sequelize";

class Usuario extends Model {
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
        nome: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Usuario",
        tableName: "usuario",
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Conta, {
      foreignKey: "usuario_id",
      as: "contas",
    });
  }
}

export default Usuario;
