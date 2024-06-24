const { CarsModel } = require("../models/CarsModel");

type CarData = Partial<InstanceType<typeof CarsModel>>;

export const createCar = (carData: CarData) => {
    return CarsModel.query().insert(carData);
}

export const updateCar = (id: number, carData: CarData) => {
    return CarsModel.query().findById(id).patch(carData);
}

export const deleteCar = (id: number) => {
    return CarsModel.query().deleteById(id);
}

export const findAll = () => {
    return CarsModel.query().whereNull('deleted_At');
}

export const findById = (id: number) => {
    return CarsModel.query().findById(id);
}

export const availableCars = () => {
    return CarsModel.query().whereNull('deleted_At').where('availabillity', true);
}

export const deletedCars = () => {
    return CarsModel.query().whereNotNull('deleted_At');
}