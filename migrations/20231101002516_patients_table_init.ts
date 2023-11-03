import { DBTables } from "@/app/types/DBTables";
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DBTables.patients, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("phone").notNullable();
    table.string("id_photo").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(DBTables.patients);
}
