import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
    id!: number;
    name!: string;
    email!: string;
    role!: string;
    password?: string;
    created_At!: Date;
    updated_At!: Date;

    static get tableName() {
        return "users";
    }
}

export type User = ModelObject<UsersModel>;