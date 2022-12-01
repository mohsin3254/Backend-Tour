const express = require("express");
const router = express.Router();

const sTour = require("../models/stour");

router.get("/getallstours", async (req, res) => {
  try {
    const stours = await Tour.find({});
    res.send(stours);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getstourbyid", async (req, res) => {
  try {
    const stourid = req.body.stourid;
    const stour = await sTour.findOne({ _id: stourid });
    res.send(stour);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getallstours", async (req, res) => {
  try {
    const stours = await sTour.find();
    res.send(stours);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/addstour", async (req, res) => {
  try {
    const newsTour = req.body;
    console.log(req.body);
    const stour = new sTour();
    stour.name = newsTour.name;
    stour.phonenumber = newsTour.phonenumber;
    stour.tourcharges = newsTour.rentperday;
    stour.description = newsTour.description;
    stour.currentbookings = [];
    if (newsTour.imageurl1 && newsTour.imageurl1.length > 0) {
      stour.imageurls.push(newsTour.imageurl1);
    }
    if (newsTour.imageurl2 && newsTour.imageurl2.length > 0) {
      stour.imageurls.push(newsTour.imageurl2);
    }
    if (newsTour.imageurl3 && newsTour.imageurl3.length > 0) {
      stour.imageurls.push(newsTour.imageurl3);
    }

    const result = await stour.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
