//Libs Nativas do Node
const fs = require('fs');
const path = require('path');
// ------------------
const Sequelize = require('sequelize');


const config = require('../config/config').development;
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);
const models = [
    require('../models/user'),
]

models.forEach((notInitializedModel) => {
    const model = notInitializedModel(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
