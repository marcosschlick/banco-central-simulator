import { Sequelize, Model } from "sequelize";

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        cpf: {
          type: Sequelize.STRING(11),
          allowNull: false,
          unique: true,
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
        timestamps: false,
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
