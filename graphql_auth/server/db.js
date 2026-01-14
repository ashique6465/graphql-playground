const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "postgres://graphql:password@localhost:5432/graphql_auth",
    {
        dialect: "postgres",
        logging:false
    }
);

module.exports = sequelize;