import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw(`
        CREATE TRIGGER cars_insert_trigger AFTER INSERT ON cars
        FOR EACH ROW EXECUTE FUNCTION log_cars_activity_function();

        CREATE TRIGGER cars_update_trigger AFTER UPDATE ON cars
        FOR EACH ROW EXECUTE FUNCTION log_cars_activity_function();

        CREATE TRIGGER cars_delete_trigger AFTER DELETE ON cars
        FOR EACH ROW EXECUTE FUNCTION log_cars_activity_function();
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`
        DROP TRIGGER IF EXISTS cars_insert_trigger ON cars;
        DROP TRIGGER IF EXISTS cars_update_trigger ON cars;
        DROP TRIGGER IF EXISTS cars_delete_trigger ON cars;
    `);
}

