const { UsersModel } = require("../models/UsersModel");

export const createUser = (userData: any) => {
    return UsersModel.query().insert(userData);
}

export const updateUser = (id: number, userData: any) => {
    return UsersModel.query().findById(id).patch(userData);
}

export const deleteUser = (id: number) => {
    return UsersModel.query().deleteById(id);
}

export const findAll = () => {
    return UsersModel.query();
}

export const findById = (id: number) => {
    return UsersModel.query().findById(id);
}

export const findByEmail = (email: string) => {
    return UsersModel.query().findOne({ email });
}
