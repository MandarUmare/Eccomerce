const mongoose = require("mongoose");
const product = require("./product");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true },
    phoneNo: { type: String, required: true },
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
      price: { type: String, required: true },
      image: { type: String, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: product,
        required: true,
      },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  paymentinfo: {
    id: { type: String, required: true },
    status: { type: String, required: true },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("order", orderSchema);
