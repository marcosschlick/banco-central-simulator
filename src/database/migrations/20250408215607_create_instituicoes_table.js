export async function up(knex) {
  return knex.schema.createTable("instituicao", (table) => {
    table.string("id", 36).primary().notNullable();
    table.string("nome", 100).notNullable();
    table.string("codigo", 3).notNullable().unique();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("instituicao");
}
