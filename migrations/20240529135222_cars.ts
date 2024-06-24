import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.integer('user_id', 10).notNullable().references('id').inTable("users").onDelete("Cascade");
        table.string('car_name', 255).notNullable();
        table.string('type', 50).notNullable();
        table.string('desc', 255).notNullable();
        table.integer('seat', 20).notNullable();
        table.string('transmission', 50).notNullable();
        table.string('year', 10).notNullable();
        table.integer('price', 20).notNullable();
        table.boolean('availabillity').notNullable().defaultTo(false);
        table.timestamp('start_rent').notNullable();
        table.timestamp('end_rent').notNullable();
        table.string('img', 100).notNullable();
        table.timestamp('created_At').notNullable();
        table.timestamp('updated_At').notNullable();
        table.timestamp('deleted_At').defaultTo(null);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

