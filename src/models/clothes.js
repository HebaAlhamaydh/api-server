//this is gonna be very simple example
"use strict";

// Our table schema
const Clothes = (sequelize, DataTypes) =>
    sequelize.define("Clothes", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        color: {
            type: DataTypes.STRING,
        },
    });

module.exports = Clothes;

