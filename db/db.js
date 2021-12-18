"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // SQLite only
    storage: "path/to/database.sqlite",
});
