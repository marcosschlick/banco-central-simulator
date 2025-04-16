import { Sequelize, Model } from "sequelize";

class Institution extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        code: {
          type: Sequelize.STRING(3),
          allowNull: false,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Institution",
        tableName: "institutions",
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Account, {
      foreignKey: "institution_id",
      as: "accounts",
    });
  }
}

export default Institution;
