import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("user"))) {
    await knex.schema.createTable("user", (table) => {
      table.increments("id");
      table.string("email", 255).notNullable();
      table.string("hash_password", 255).notNullable();
      table.boolean("is_admin").notNullable().defaultTo(false);
    });
  }
  if (!(await knex.schema.hasTable("template"))) {
    await knex.schema.createTable("template", (table) => {
      table.increments("id");
      table.string("name", 255).notNullable();
    });
  }
  if (!(await knex.schema.hasTable("field"))) {
    await knex.schema.createTable("field", (table) => {
      table.increments("id");
      table.integer("template_id").references("user.id");
      table.string("label", 255).notNullable();
      table.string("type", 255).notNullable();
      table.integer("order").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("form"))) {
    await knex.schema.createTable("form", (table) => {
      table.increments("id");
      table.string("submitted_title").notNullable();
      table.integer("template_id").notNullable().references("user.id");
      table.integer("creator_id").notNullable().references("user.id");
      table.integer("filler_id").notNullable().references("user.id");
      table.integer("admin").notNullable().references("user.id");
      table.timestamp("create_time").nullable();
      table.timestamp("submit_time").nullable();
      table.timestamp("remove_time").nullable();
    });
  }
  if (!(await knex.schema.hasTable("form_viewer"))) {
    await knex.schema.createTable("form_viewer", (table) => {
      table.increments("id");
      table.integer("form_id").notNullable().references("form.id");
      table.integer("user_id").references("user.id");
    });
  }
  if (!(await knex.schema.hasTable("form_response"))) {
    await knex.schema.createTable("form_response", (table) => {
      table.increments("id");
      table.integer("field_id").notNullable().references("field.id");
      table.integer("form_id").notNullable().references("form.id");
      table.string("content", 255).notNullable();
    });
  }
  if (!(await knex.schema.hasTable("form_reference"))) {
    await knex.schema.createTable("form_reference", (table) => {
      table.increments("id");
      table.integer("form_id").notNullable().references("form.id");
      table.integer("reference_form_id").notNullable().references("form.id");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("form_viewer");
  await knex.schema.dropTableIfExists("form_response");
  await knex.schema.dropTableIfExists("form_reference");
  await knex.schema.dropTableIfExists("field");
  await knex.schema.dropTableIfExists("form");
  await knex.schema.dropTableIfExists("template");
  await knex.schema.dropTableIfExists("user");
}
