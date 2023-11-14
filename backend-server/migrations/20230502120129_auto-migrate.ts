import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("form", (table) => {
    table.dropColumn("admin");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("form", (table) => {
    table.integer("admin").notNullable().references("user.id");
  });
}
