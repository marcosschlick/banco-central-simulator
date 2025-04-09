export async function up(knex) {
  return knex.schema.createTable("conta", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("usuario_id").notNullable().references("id").inTable("usuario");
    table
      .uuid("instituicao_id")
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
