import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.database!, process.env.user!, process.env.password, {
    host: 'localhost',
    dialect: 'mysql'
});