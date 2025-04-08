export async function up(knex) {
  return knex.schema.createTable("conta", (table) => {
    table.string("id", 36).primary().notNullable();
    table
      .string("usuario_id", 36)
      .notNullable()
      .references("id")
      .inTable("usuario");
    table
      .string("instituicao_id", 36)
      .notNullable()
      .references("id")
      .inTable("instituicao");
    table.decimal("saldo", 15, 2).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("conta");
}
