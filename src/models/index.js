const Sequelize = require('sequelize');

const config = require('../config/database').development;

const db = {};

const models = [
    require('../models/user'),
    require('../models/posts'),
]

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);
/**
 * db = {
 *  User: ...
 * }
 */
models.forEach((notInitializedModel) => {
    const model = notInitializedModel(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
    if(db[model.name].associate) {
        db[model.name].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
