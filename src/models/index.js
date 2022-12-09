const { Sequelize } = require("sequelize");
const config = require("../config/index");
const sequelize = new Sequelize(config.db_name, config.db_user, config.db_pass, {
    host: config.db_host,
    dialect: config.db_dialect,
    port: config.db_port,
});
// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
module.exports = sequelize;
