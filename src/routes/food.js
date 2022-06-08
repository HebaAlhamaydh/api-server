"use strict";
const express = require("express");

//in this line we are taking the routing functionality from express

const { Food } = require("../models/index");


const foodRouter = express.Router();

//add routes
foodRouter.get("/food", getFood);
foodRouter.get("/food/:id", getOneFood);
foodRouter.post("/food", addFood);
foodRouter.put("/food/:id", updateFood);
foodRouter.delete("/food/:id", deleteFood);
// to add functionality we need to add
async function getFood(req, res) {
    const allFood = await Food.read();
    res.status(200).json(allFood);
}
//if we want to find one

async function getOneFood(req, res) {
    //just make sure to parse it into int because it will be a number but in string format
    const foodId = parseInt(req.params.id);
    let food = await Food.read(foodId);
    res.status(200).json(food);
}

// for adding new record
async function addFood(req, res) {
    //adding a person to DB or File or whatever
    //regarding the success status for the post it is not 200 it's from 200's family it's 201 once you added something and it's successfully created
    let newFood = req.body;
    let food = await Food.create(newFood);
    res.status(201).json(food);
}

async function updateFood(req, res) {

    let foodId = parseInt(req.params.id);
    let updateFood = req.body; //the one that the form will send to us from the frontend
    let foundFood = await Food.read(foodId);
    if (foundFood) {

        let updatedFood = await foundFood.update(updateFood);
        res.status(201).json(updatedFood);
    } else {
        // throw new Error('there is not such id');
        res.status(404);
    }
}

async function deleteFood(req, res) {
    let foodId = parseInt(req.params.id);
    let foundFood = await Food.read(foodId);
    if (foundFood) {
        let deletedFood = await Food.delete(foodId);
      res.status(204).json(deletedFood);
    } else {
      res.status(404).json({ message: 'Food is not Found' });
    }
  }
module.exports = foodRouter;