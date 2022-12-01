const express = require("express");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51M2qZEJdqzfSzjlZSYueQsk8wh39ALTsqc3TOmKPoPXHdRSw4p0vCorFbPqaHBo1bU0NsUdBgTxiDBmjORxtoQ6E00spOYJZ4Z"
); //
const { v4: uuidv4 } = require("uuid"); //https://www.npmjs.com/package/uuid

const router = express.Router();

const Booking = require("../models/tourbooking");
const Tour = require("../models/tour");

router.post("/getallbookings", async (req, res) => {
  try {
    const tourbookings = await Booking.find();
    res.send(tourbookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, tourid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });

    booking.status = "cancelled";
    await booking.save();
    const tour = await Tour.findOne({ _id: tourid });
    const tourbookings = tour.currentbookings;
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
    tour.currentbookings = temp;
    await tour.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const tourbookings = await Booking.find({ userid: userid });

    res.send(tourbookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/booktour", async (req, res) => {
  try {
    const { tour, userid, fromdate, todate, totalAmount, totaldays, token } =
      req.body;

    try {
      //create customer
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      //charge payment
      const payment = await stripe.charges.create(
        {
          amount: totalAmount * 100,
          customer: customer.id,
          currency: "USD",
          receipt_email: token.email,
        },
        {
          idempotencyKey: uuidv4(),
        }
      );

      //Payment Success
      if (payment) {
        try {
          const newBooking = new Booking({
            tour: tour.name,
            tourid: tour._id,
            userid,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            totalamount: totalAmount,
            totaldays,
            transactionid: uuidv4(),
          });

          const booking = await newBooking.save();

          const tourTmp = await Tour.findOne({ _id: tour._id });
          tourTmp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            userid: userid,
            status: booking.status,
          });

          await tourTmp.save();
          res.send("Payment Successful, Your tour is booked");
        } catch (error) {
          return res.status(400).json({ message: error });
        }
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
