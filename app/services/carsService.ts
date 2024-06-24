const carRepository = require("../repositories/carsRepository")

export const createCar = (carData: any) => {
    return carRepository.createCar(carData);
}

export const updateCar = (id: number, carData: any) => {
    return carRepository.updateCar(id, carData);
}

export const deleteCar = (id: number) => {
    return carRepository.deleteCar(id);
}

export const findAll = () => {
    return carRepository.findAll();
}

export const findById = (id: number) => {
    return carRepository.findById(id);
}

export const availableCars = () => {
    return carRepository.availableCars();
}

export const deletedCars = () => {
    return carRepository.deletedCars();
}