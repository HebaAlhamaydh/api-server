//this is gonna be very simple example
"use strict";

// Our table schema
const Food = (sequelize, DataTypes) =>
    sequelize.define("Food", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        price: {
            type: DataTypes.INTEGER,
        },
    });

module.exports = Food;

