const logRepository = require("../repositories/logRepository")

export const findAll = () => {
    return logRepository.findAll();
}

export const findInsert = () => {
    return logRepository.findInsert();
}

export const findUpdate = () => {
    return logRepository.findUpdate();
}

export const findDelete = () => {
    return logRepository.findDelete();
}