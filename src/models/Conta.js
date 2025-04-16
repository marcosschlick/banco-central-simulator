import { Sequelize, Model } from "sequelize";

class Conta extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        saldo: {
          type: Sequelize.DECIMAL(15, 2),
          defaultValue: 0,
          allowNull: false,
          validate: { min: 0 },
        },
        credito_limite: {
          type: Sequelize.DECIMAL(15, 2),
          defaultValue: 0,
          allowNull: false,
          validate: { min: 0 },
        },
        credito_disponivel: {
          type: Sequelize.DECIMAL(15, 2),
          defaultValue: 0,
          allowNull: false,
          validate: { min: 0 },
        },
      },
      {
        sequelize,
        modelName: "Conta",
        tableName: "conta",
        timestamps: true,
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
      foreignKey: "conta_origem",
      as: "transacoes_enviadas",
    });

    this.hasMany(models.Transacao, {
      foreignKey: "conta_destino",
      as: "transacoes_recebidas",
    });
  }
}

export default Conta;
