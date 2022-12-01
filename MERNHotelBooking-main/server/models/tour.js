const mongoose = require("mongoose");

const tourSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phonenumber: {
      type: Number,
      required: true,
    },
    rentperday: {
      type: Number,
      required: true,
    },
    imageurls: [],
    currentbookings: [],
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const tourModel = mongoose.model("tours", tourSchema);

module.exports = tourModel;
