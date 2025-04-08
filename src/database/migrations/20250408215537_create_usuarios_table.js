export async function up(knex) {
  return knex.schema.createTable("usuario", (table) => {
    table.string("id", 36).primary().notNullable();
    table.string("nome", 100).notNullable();
    table.string("cpf", 11).notNullable().unique();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("usuario");
}
