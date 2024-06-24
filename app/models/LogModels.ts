import { Model, ModelObject } from "objection";

export class LogModels extends Model {
    id!: number;
    user_id!: number;
    user_name!: string;
    process!: string;
    car_name!: string;
    price!: number;
    availabillity!: boolean;
    start_rent!: Date;
    end_rent!: Date;
    img!: string;
    created_At!: Date;
    updated_At!: Date;
    deleted_At!: Date | null;

    static get tableName() {
        return 'log_cars_activity';
    }
}

export type User = ModelObject<LogModels>;