const express = require("express");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51M2qZEJdqzfSzjlZSYueQsk8wh39ALTsqc3TOmKPoPXHdRSw4p0vCorFbPqaHBo1bU0NsUdBgTxiDBmjORxtoQ6E00spOYJZ4Z"
); //
const { v4: uuidv4 } = require("uuid"); //https://www.npmjs.com/package/uuid

const router = express.Router();

const Booking = require("../models/stourbooking");
const Tour = require("../models/stour");

router.post("/getallbookings", async (req, res) => {
  try {
    const stourbookings = await Booking.find();
    res.send(stourbookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/cancelbooking", async (req, res) => {
  const { bookingid, stourid } = req.body;
  try {
    const booking = await Booking.findOne({ _id: bookingid });

    booking.status = "cancelled";
    await booking.save();
    const stour = await sTour.findOne({ _id: stourid });
    const stourbookings = stour.currentbookings;
    const temp = bookings.filter((x) => x.bookingid.toString() !== bookingid);
    tour.currentbookings = temp;
    await stour.save();

    res.send("Your booking cancelled successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/getbookingbyuserid", async (req, res) => {
  const { userid } = req.body;
  try {
    const stourbookings = await Booking.find({ userid: userid });

    res.send(stourbookings);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/booktour", async (req, res) => {
  try {
    const { stour, userid, tourcharges, totaldays, token } = req.body;

    try {
      //create customer
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      //charge payment
      const payment = await stripe.charges.create(
        {
          amount: tourcharges * 100,
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
            stour: stour.name,
            stourid: stour._id,
            userid,
            tourcharges: tourcharges,
            totaldays,
            transactionid: uuidv4(),
          });

          const booking = await newBooking.save();

          const stourTmp = await sTour.findOne({ _id: stour._id });
          stourTmp.currentbookings.push({
            bookingid: booking._id,

            userid: userid,
            status: booking.status,
          });

          await stourTmp.save();
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
