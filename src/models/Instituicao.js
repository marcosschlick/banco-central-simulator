import { Sequelize, Model } from "sequelize";

class Instituicao extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        codigo: {
          type: Sequelize.STRING(3),
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
        modelName: "Instituicao",
        tableName: "instituicao",
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Conta, {
      foreignKey: "instituicao_id",
      as: "contas",
    });
  }
}

export default Instituicao;
