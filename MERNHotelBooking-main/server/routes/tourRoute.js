const express = require("express");
const router = express.Router();

const Tour = require("../models/tour");

router.get("/getalltours", async (req, res) => {
  try {
    const tours = await Tour.find({});
    res.send(tours);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/gettourbyid", async (req, res) => {
  try {
    const tourid = req.body.tourid;
    const tour = await Tour.findOne({ _id: tourid });
    res.send(tour);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/getalltours", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.send(tours);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/addtour", async (req, res) => {
  try {
    const newTour = req.body;
    console.log(req.body);
    const tour = new Tour();
    tour.name = newTour.name;
    tour.maxcount = newTour.maxcount;
    tour.phonenumber = newTour.phonenumber;
    tour.rentperday = newTour.rentperday;
    tour.type = newTour.type;
    tour.description = newTour.description;
    tour.currentbookings = [];
    if (newTour.imageurl1 && newTour.imageurl1.length > 0) {
      tour.imageurls.push(newTour.imageurl1);
    }
    if (newTour.imageurl2 && newTour.imageurl2.length > 0) {
      tour.imageurls.push(newTour.imageurl2);
    }
    if (newTour.imageurl3 && newTour.imageurl3.length > 0) {
      tour.imageurls.push(newTour.imageurl3);
    }

    const result = await tour.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
