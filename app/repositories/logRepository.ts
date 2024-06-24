const { LogModels } = require("../models/LogModels");

type CarData = Partial<InstanceType<typeof LogModels>>;

export const findAll = () => {
    return LogModels.query();
}

export const findInsert = () => {
    return LogModels.query().where('process', 'insert').orderBy('id');
}

export const findUpdate = () => {
    return LogModels.query().where('process', 'update').orderBy('id');
}

export const findDelete = () => {
    return LogModels.query().where('process', 'delete').orderBy('id');
}
