const catchAsyncErrors = require("../middleware/catchAsyncError");
var path = require("path");
var express = require("express");
var router = express.Router();
const passport = require("passport");
require("../middleware/passport");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
  "/process/payment",

  catchAsyncErrors(async function (req, res) {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  })
);

router.get(
  "/stripeapikey",

  catchAsyncErrors(function (req, res) {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  })
);
module.exports = router;
