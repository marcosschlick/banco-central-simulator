import { Sequelize, Model } from "sequelize";

export default class OpenFinance extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        status: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
          validate: {
            isValidStatus(value) {
              const now = new Date();
              if (
                value === true &&
                this.expiration_date &&
                this.expiration_date < now
              ) {
                throw new Error(
                  "Cannot activate with an expiration date in the past",
                );
              }

              if (
                value === false &&
                this.expiration_date &&
                this.expiration_date > now
              ) {
                throw new Error(
                  "Cannot have a future date with inactive status",
                );
              }
            },
          },
        },
        expiration_date: {
          type: Sequelize.DATE,
          allowNull: true,
          validate: {
            isValidDate(value) {
              const now = new Date();
              if (value && value < now && this.status === true) {
                throw new Error(
                  "Expiration date cannot be in the past for active status",
                );
              }
            },
          },
        },
      },
      {
        sequelize,
        modelName: "OpenFinance",
        tableName: "open_finance",
        timestamps: true,
        hooks: {
          beforeSave: async (authorization) => {
            const now = new Date();

            if (
              authorization.status === true &&
              authorization.expiration_date &&
              authorization.expiration_date < now
            ) {
              authorization.status = false;
            }
          },
          beforeFind: async (options) => {
            const now = new Date();

            await OpenFinanceAuthorization.update(
              { status: false },
              {
                where: {
                  status: true,
                  expiration_date: { [Sequelize.Op.lt]: now },
                },
                silent: true,
              },
            );
          },
        },
      },
    );

    return this;
  }
}
