"use strict";
require('dotenv').config();

// Connects to our database depending on the URI as an environmental variable
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");

const Food = require('./food');
const Clothes  = require('./clothes');
const Collection =require('./lib/collection-class');



let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl :{require: true,
                    rejectUnauthorized: false},
                native: true
            }
        } : {};


// we are going to use this to connect to Postgres
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const FoodTable = Food(sequelize, DataTypes);
const clothesTable = Clothes (sequelize, DataTypes);

const foodCollection = new Collection(FoodTable);
const clothesCollection = new Collection(clothesTable);



module.exports = {
    db: sequelize,
    Food:foodCollection,
    Clothes: clothesCollection
};


