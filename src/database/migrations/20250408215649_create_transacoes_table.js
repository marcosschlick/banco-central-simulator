export async function up(knex) {
  return knex.schema.createTable("transacao", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.uuid("conta_id").notNullable().references("id").inTable("conta");
    table.decimal("valor", 15, 2).notNullable();
    table.timestamp("data").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("transacao");
}
