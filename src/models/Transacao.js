import { Sequelize, Model } from "sequelize";

class Transacao extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        tipo: {
          type: Sequelize.ENUM("debito", "credito"),
          allowNull: false,
        },
        valor: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: false,
          validate: { min: 0.01 },
        },
        data: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        modelName: "Transacao",
        tableName: "transacao",
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Conta, {
      foreignKey: "conta_origem",
      as: "origem",
    });

    this.belongsTo(models.Conta, {
      foreignKey: "conta_destino",
      as: "destino",
    });
  }
}

export default Transacao;
