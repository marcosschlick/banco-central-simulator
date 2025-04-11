import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transacao = sequelize.define(
  "Transacao",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    codigo: {
      type: DataTypes.STRING(15),
    },
    tipo: {
      type: DataTypes.ENUM("debito", "credito", "transferencia"),
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "transacao",
    timestamps: false,
  },
);

Transacao.associate = (models) => {
  Transacao.belongsTo(models.Conta, {
    foreignKey: "conta_id",
    as: "conta_origem",
    onDelete: "CASCADE",
  });

  Transacao.belongsTo(models.Conta, {
    foreignKey: "conta_destino",
    as: "conta_destino",
    onDelete: "SET NULL",
  });
};

export default Transacao;
