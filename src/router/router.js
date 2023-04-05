import express from "express";
import { getCollection } from "../mongodb/mongodbClient.js";
import jwtFilter from "../filter/jwtFilter.js";

export const router = express.Router();

router.get("/food", async (req, res) => {
  if (Object.keys(req.query).length) {
    console.log(req.query.q);
    let foods = await getCollection("food")
      .find({
        $or: [{ category_name: req.query.q }, { "content.title": req.query.q }],
      })
      .toArray();
    res.status(200).json({ result: foods });
  } else {
    let foods = await getCollection("food").find().toArray();
    res.status(200).json({ foods });
  }
});
router.use(jwtFilter.authorize);

router.get("/order", async (req, res) => {
  let orders = await getCollection("orders")
    .find({ customerid: req.userdetails.userid })
    .toArray();
  res.status(200).json({ "orders for": req.userdetails.username, orders });
});

router.post("/order", async (req, res) => {
  let order = await getCollection("orders").insertOne(req.body);
  res.status(200).json({ order });
});
