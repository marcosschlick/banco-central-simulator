import { Sequelize, DataTypes } from "sequelize";

const commonFields = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: "updated_at",
  },
};

export default {
  async up(queryInterface) {
    await queryInterface.createTable("usuario", {
      ...commonFields,
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        validate: { len: [11, 11] },
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("instituicao", {
      ...commonFields,
      codigo: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("conta", {
      ...commonFields,
      saldo: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
        validate: { min: 0 },
      },
      credito_limite: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
        validate: { min: 0 },
      },
      credito_disponivel: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
        validate: { min: 0 },
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        references: { model: "usuario", key: "id" },
      },
      instituicao_id: {
        type: DataTypes.INTEGER,
        references: { model: "instituicao", key: "id" },
      },
    });

    await queryInterface.addConstraint("conta", {
      fields: ["usuario_id", "instituicao_id"],
      type: "unique",
      name: "unique_conta_usuario_instituicao",
    });

    await queryInterface.createTable("transacao", {
      ...commonFields,
      tipo: {
        type: DataTypes.ENUM("debito", "credito"),
        allowNull: false,
      },
      valor: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: { min: 0.01 },
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      conta_origem: {
        type: DataTypes.INTEGER,
        references: { model: "conta", key: "id" },
        allowNull: false,
      },
      conta_destino: {
        type: DataTypes.INTEGER,
        references: { model: "conta", key: "id" },
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("transacao");
    await queryInterface.dropTable("conta");
    await queryInterface.dropTable("instituicao");
    await queryInterface.dropTable("usuario");
  },
};
