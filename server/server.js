const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const Restaurant = require("./models/restaurantModel");
const { getPostData } = require("./utils");
const url = "/api/restaurants";

app.get(url, async (_, res) => {
  try {
    const restaurants = await Restaurant.findAll();

    res.status(200).json(restaurants);
  } catch (err) {
    console.log(err);
  }
});

app.get(`${url}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      res.status(404).json({ message: `Restaurant:${id} not found.` });
    } else {
      res.status(200).json(restaurant);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post(url, async (req, res) => {
  try {
    const body = await getPostData(req);

    const { name, rating, price } = JSON.parse(body);

    const restaurant = { name, rating, price };

    const newRestaurant = await Restaurant.create(restaurant);

    res.status(201).json(newRestaurant);
  } catch (err) {
    console.log(err);
  }
});

app.put(`${url}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      res.status(404).json({ message: `Restaurant:${id} not found.` });
    } else {
      const body = await getPostData(req);

      const { name, rating, price } = JSON.parse(body);

      const newRestaurant = {
        name: name || restaurant.name,
        rating: rating || restaurant.rating,
        price: price || restaurant.price,
      };

      const updatedRestaurant = await Restaurant.update(id, newRestaurant);

      res.status(200).json(updatedRestaurant);
    }
  } catch (err) {
    console.log(err);
  }
});

app.delete(`${url}/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      res.status(404).json({ message: `Restaurant:${id} not found.` });
    } else {
      await Restaurant.remove(id);
      res.status(200).json({ message: `Restaurant:${id} removed.` });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`Listening to port:${port}...`));
