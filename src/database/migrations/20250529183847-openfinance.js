import { DataTypes } from "sequelize";

const commonFields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
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
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable("banks", {
      ...commonFields,
      agency_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      logo_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    });

    await queryInterface.createTable("accounts", {
      ...commonFields,
      balance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      account_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      bank_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "banks",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.addConstraint("accounts", {
      fields: ["user_id", "bank_id"],
      type: "unique",
      name: "unique_user_bank_account",
    });

    await queryInterface.createTable("open_finance", {
      ...commonFields,
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expiration: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "accounts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });

    await queryInterface.createTable("transactions", {
      ...commonFields,
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "accounts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("transactions");
    await queryInterface.dropTable("open_finance");
    await queryInterface.dropTable("accounts");
    await queryInterface.dropTable("banks");
    await queryInterface.dropTable("users");
  },
};
