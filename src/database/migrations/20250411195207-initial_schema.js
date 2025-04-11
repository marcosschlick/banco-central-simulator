import { DataTypes } from "sequelize";

export default {
  async up(queryInterface) {
    // tabela usuario
    await queryInterface.createTable("usuario", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    });

    // tabela instituicao
    await queryInterface.createTable("instituicao", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
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

    // tabela conta
    await queryInterface.createTable("conta", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      saldo: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      credito_limite: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      credito_disponivel: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.UUID,
        references: {
          model: "usuario",
          key: "id",
        },
      },
      instituicao_id: {
        type: DataTypes.UUID,
        references: {
          model: "instituicao",
          key: "id",
        },
      },
    });

    // índice único composto para conta
    await queryInterface.addConstraint("conta", {
      fields: ["usuario_id", "instituicao_id"],
      type: "unique",
      name: "unique_user_institution",
    });

    // tabela transacao
    await queryInterface.createTable("transacao", {
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
      conta_id: {
        type: DataTypes.UUID,
        references: {
          model: "conta",
          key: "id",
        },
      },
      conta_destino: {
        type: DataTypes.UUID,
        references: {
          model: "conta",
          key: "id",
        },
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
