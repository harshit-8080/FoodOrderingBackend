const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = new Schema({
  vendorId: { type: String, require: true },
  items: [
    {
      food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
      units: { type: Number, required: true },
    },
  ],
  totalAmount: {
    type: Number,
    require: true,
  },
  orderDate: {
    type: Date,
    require: true,
  },
  vendorId: { type: String, require: true },
  orderStatus: { type: String },
  remarks: { type: String },
  deliveryID: { type: String },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
