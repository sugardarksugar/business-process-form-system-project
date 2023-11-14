import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("form", (table) => {
    table.dropForeign("template_id");
    table.foreign("template_id").references("template.id");
  });
  await knex.schema.alterTable("field", (table) => {
    table.dropForeign("template_id");
    table.foreign("template_id").references("template.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("field", (table) => {
    table.dropForeign("template_id");
    table.foreign("template_id").references("template.id");
  });
  await knex.schema.alterTable("form", (table) => {
    table.dropForeign("template_id");
    table.foreign("template_id").references("template.id");
  });
}
