import { Sequelize, Model } from "sequelize";

class Conta extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        saldo: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: false,
        },
        credito_limite: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: false,
        },
        credito_disponivel: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Conta",
        tableName: "conta",
        timestamps: false,
        uniqueKeys: {
          unique_user_institution: {
            fields: ["usuario_id", "instituicao_id"],
          },
        },
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
    });

    this.belongsTo(models.Instituicao, {
      foreignKey: "instituicao_id",
      as: "instituicao",
    });

    this.hasMany(models.Transacao, {
      foreignKey: "conta_id",
      as: "transacoes",
    });
  }
}

export default Conta;
