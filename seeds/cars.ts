import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        {
            user_id: 1,
            car_name: 'Toyota Camry',
            type: 'Sedan', // Add car type
            desc: 'A spacious and comfortable sedan for everyday driving.', // Add car description
            seat: 5,
            transmission: 'Automatic',
            year: '2023',
            price: 20000,
            availabillity: true,
            start_rent: knex.fn.now(),
            end_rent: knex.fn.now(),
            img: 'camry.jpg',
            created_At: knex.fn.now(),
            updated_At: knex.fn.now(),
            deleted_At: null,
        },
        {
            user_id: 2,
            car_name: 'Honda Civic',
            type: 'Sedan', // Add car type
            desc: 'A sporty and fuel-efficient sedan for city driving.', // Add car description
            seat: 5,
            transmission: 'Automatic',
            year: '2022',
            price: 15000,
            availabillity: false,
            start_rent: knex.fn.now(),
            end_rent: knex.fn.now(),
            img: 'civic.jpg',
            created_At: knex.fn.now(),
            updated_At: knex.fn.now(),
            deleted_At: null,
        },
        {
            user_id: 3,
            car_name: 'Tesla Model S',
            type: 'Electric Sedan', // Add car type
            desc: 'A luxurious and high-performance electric sedan.', // Add car description
            seat: 5,
            transmission: 'Automatic',
            year: '2024',
            price: 50000,
            availabillity: true,
            start_rent: knex.fn.now(),
            end_rent: knex.fn.now(),
            img: 'model_s.jpg',
            created_At: knex.fn.now(),
            updated_At: knex.fn.now(),
            deleted_At: null,
        },
    ]);
};
