import { Knex } from "knex";
import { hashPassword } from "../app/utils/authUser";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // set password for users when seeder
    const passSuperAdmin = await hashPassword("superadmin");
    const passAdmin = await hashPassword("admin");
    const passMember = await hashPassword("member")

    // Inserts seed entries
    await knex("users").insert([
        { name: "superadmin", email: "superadmin@mail.com", password: passSuperAdmin, role: "superadmin", created_At: knex.fn.now(), updated_At: knex.fn.now(), deleted_At: null },
        { name: "admin", email: "admin@mail.com", password: passAdmin, role: "admin", created_At: knex.fn.now(), updated_At: knex.fn.now(), deleted_At: null  },
        { name: "member", email: "member@mail.com", password: passMember, role: "member", created_At: knex.fn.now(), updated_At: knex.fn.now(), deleted_At: null  },
    ]);
};
