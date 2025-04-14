import { Sequelize, Model } from "sequelize";

class Transacao extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        codigo: {
          type: Sequelize.STRING(15),
        },
        tipo: {
          type: Sequelize.ENUM("debito", "credito", "transferencia"),
          allowNull: false,
        },
        valor: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: false,
        },
        data: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Transacao",
        tableName: "transacao",
        timestamps: false,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Conta, {
      foreignKey: "conta_id",
      as: "conta_origem",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Conta, {
      foreignKey: "conta_id",
      as: "conta_destino",
      onDelete: "SET NULL",
    });
  }
}

export default Transacao;
