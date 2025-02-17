require("dotenv").config({ path: __dirname + "/../.env" }); // Explicitly set path

const ENV_VARS = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET
};

// Debugging: Check if values are loaded
console.log("DB_NAME:", ENV_VARS.DB_NAME || "Not Loaded");
console.log("DB_USER:", ENV_VARS.DB_USER || "Not Loaded");
console.log("DB_PASSWORD:", ENV_VARS.DB_PASSWORD ? "Loaded" : "Not Loaded");
console.log("DB_HOST:", ENV_VARS.DB_HOST || "Not Loaded");
console.log("PORT:", ENV_VARS.PORT);
console.log("JWT_SECRET:", ENV_VARS.JWT_SECRET ? "Loaded" : "Not Loaded");

module.exports = { ENV_VARS };
