const restaurants = require("../data/restaurants.json");
const { v4: uuidv4 } = require("uuid");

const { writeDataToFile } = require("../utils");
const filename = "./data/restaurants.json";

const findAll = () => {
  return new Promise((resolve, _) => {
    resolve(restaurants);
  });
};

const findById = (id) => {
  return new Promise((resolve, _) => {
    const restaurant = restaurants.find((restaurant) => restaurant.id === id);
    resolve(restaurant);
  });
};

const create = (restaurant) => {
  return new Promise((resolve, _) => {
    const newRestaurant = { id: uuidv4(), ...restaurant };
    restaurants.push(newRestaurant);
    if (process.env.NODE_ENV !== "test") {
      console.log(process.env.NODE_ENV);
      writeDataToFile(filename, restaurants);
    }
    resolve(newRestaurant);
  });
};

const update = (id, newRestaurant) => {
  return new Promise((resolve, _) => {
    const index = restaurants.findIndex((restaurant) => restaurant.id === id);
    restaurants[index] = { id, ...newRestaurant };
    if (process.env.NODE_ENV !== "test") {
      console.log(process.env.NODE_ENV);
      writeDataToFile(filename, restaurants);
    }
    resolve(restaurants[index]);
  });
};

const remove = (id) => {
  return new Promise((resolve, _) => {
    const newRestaurants = restaurants.filter(
      (restaurant) => restaurant.id !== id
    );
    if (process.env.NODE_ENV !== "test") {
      console.log(process.env.NODE_ENV);
      writeDataToFile(filename, newRestaurants);
    }
    resolve();
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
