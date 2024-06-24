import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
    id!: number;
    user_id!: number;
    car_name!: string;
    type!: string;
    desc!: string;
    seat!: number;
    transmission!: string;
    year!: string;
    price!: number;
    availabillity!: boolean;
    start_rent!: Date;
    end_rent!: Date;
    img!: string;
    created_At!: Date;
    updated_At!: Date;
    deleted_At!: Date | null;

    static get tableName() {
        return 'cars';
    }
}

export type User = ModelObject<CarsModel>;