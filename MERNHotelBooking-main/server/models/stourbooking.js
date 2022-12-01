const mongoose = require("mongoose");

const stourbookingSchema = mongoose.Schema(
  {
    stour: { type: String, required: true },
    status: { type: String, required: true, default: "booked" },
    transactionid: { type: String, required: true },
    stourid: { type: String, required: true },
    userid: { type: String, required: true },

    tourcharges: {
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

const stourbookingModel = mongoose.model("stourbookings", stourbookingSchema);

module.exports = stourbookingModel;
