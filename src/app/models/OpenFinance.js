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
        expiration: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          validate: {
            isValidExpiration(value) {
              if (this.expiration_date && value === false) {
                throw new Error(
                  "Expiration must be true if expiration_date is set",
                );
              }
              if (!this.expiration_date && value === true) {
                throw new Error(
                  "Expiration cannot be true if expiration_date is not set",
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
          beforeValidate: async (authorization) => {
            if (authorization.expiration_date) {
              authorization.expiration = true;
            } else {
              authorization.expiration = false;
            }
          },
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

            await OpenFinance.update(
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
