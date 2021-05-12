const Sequelize = require('sequelize');
const dbCredentials = require('./config');

const sequelize = new Sequelize(
    dbCredentials.development.database,
    dbCredentials.development.username,
    dbCredentials.development.password,
  {
    host: dbCredentials.development.host,
    port: 5432,
    dialect: dbCredentials.development.dialect,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
