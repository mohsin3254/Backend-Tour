const mongoose = require("mongoose");

const stourSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phonenumber: {
      type: Number,
      required: true,
    },
    tourcharges: {
      type: Number,
      required: true,
    },
    imageurls: [],
    currentbookings: [],
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const stourModel = mongoose.model("stour", stourSchema);

module.exports = stourModel;
