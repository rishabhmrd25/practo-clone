require("dotenv").config(); // Load .env before anything else
const { Sequelize } = require("sequelize");

console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Loaded" : "Not Loaded");
console.log("DB_HOST:", process.env.DB_HOST);







const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: "mysql"
    }
);

module.exports = { sequelize };
