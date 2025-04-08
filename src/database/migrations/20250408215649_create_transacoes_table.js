export async function up(knex) {
  return knex.schema.createTable("transacao", (table) => {
    table.string("id", 36).primary().notNullable();
    table
      .string("conta_id", 36)
      .notNullable()
      .references("id")
      .inTable("conta");
    table.decimal("valor", 15, 2).notNullable();
    table.timestamp("data").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("transacao");
}
