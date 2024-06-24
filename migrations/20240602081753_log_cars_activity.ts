import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("log_cars_activity", (table: Knex.TableBuilder) => {
        table.increments('id').primary();
        table.integer('user_id', 10);
        table.string('user_name', 255);
        table.string('process', 20);
        table.string('car_name', 255);
        table.integer('price', 20);
        table.boolean('availabillity');
        table.timestamp('start_rent');
        table.timestamp('end_rent');
        table.string('img', 100);
        table.timestamp('created_At');
        table.timestamp('updated_At');
        table.timestamp('deleted_At').defaultTo(null);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("log_cars_activity");

}

