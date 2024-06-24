const userRepository = require("../repositories/userRepository");

export const createUser = (userData: any) => {
    return userRepository.createUser(userData);
}

export const updateUser = (id: number, userData: any) => {
    return userRepository.updateUser(id, userData);
}

export const deleteUser = (id: number) => {
    return userRepository.deleteUser(id);
}

export const findAll = () => {
    return userRepository.findAll();
}

export const findById = (id: number) => {
    return userRepository.findById(id);
}

export const findByEmail = (email: string) => {
    return userRepository.findByEmail(email);
}

