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
    await queryInterface.createTable("users", {
      ...commonFields,
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
        validate: { len: [11, 11] },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("institutions", {
      ...commonFields,
      code: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("accounts", {
      ...commonFields,
      balance: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
        validate: { min: 0 },
      },
      credit_limit: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
        validate: { min: 0 },
      },
      credit_available: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0,
        allowNull: false,
        validate: { min: 0 },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      institution_id: {
        type: DataTypes.INTEGER,
        references: { model: "institutions", key: "id" },
      },
    });

    await queryInterface.addConstraint("accounts", {
      fields: ["user_id", "institution_id"],
      type: "unique",
      name: "unique_account_user_institution",
    });

    await queryInterface.createTable("transactions", {
      ...commonFields,
      type: {
        type: DataTypes.ENUM("debit", "credit"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: { min: 0.01 },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      origin_account_id: {
        type: DataTypes.INTEGER,
        references: { model: "accounts", key: "id" },
        allowNull: false,
      },
      destination_account_id: {
        type: DataTypes.INTEGER,
        references: { model: "accounts", key: "id" },
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("transactions");
    await queryInterface.dropTable("accounts");
    await queryInterface.dropTable("institutions");
    await queryInterface.dropTable("users");
  },
};
