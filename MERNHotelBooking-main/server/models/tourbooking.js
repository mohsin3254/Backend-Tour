const mongoose = require("mongoose");

const tourbookingSchema = mongoose.Schema(
  {
    tour: { type: String, required: true },
    status: { type: String, required: true, default: "booked" },
    transactionid: { type: String, required: true },
    tourid: { type: String, required: true },
    userid: { type: String, required: true },
    fromdate: { type: String, required: true },
    todate: { type: String, required: true },
    totalamount: {
      type: Number,
      required: true,
    },
    totaldays: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const tourbookingModel = mongoose.model("tourbookings", tourbookingSchema);

module.exports = tourbookingModel;
