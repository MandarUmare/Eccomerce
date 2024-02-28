var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require("cloudinary");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");
var orderRouter = require("./routes/order");
var paymentRouter = require("./routes/paymentRoute");
const passport = require("passport");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var app = express();
const mongoose = require("mongoose");

// view engine setup
const corsOptions = {
  origin: "https://eccomerce-v3xw.onrender.com",
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use(passport.initialize());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection Sucessful!");
  })
  .catch(() => {
    console.log("Something went wrong");
  });
app.use(fileUpload());
cloudinary.config({
  cloud_name: "dw0q2zlee",
  api_key: "243523134546874",
  api_secret: "EeTfCbA1_rYtAA9c98oaTHX0eqw",
  secure: true,
});
app.use(logger("dev"));

// Handle GET requests to all other routes by serving the index.html

app.use(bodyParser.json({ limit: "500mb", parameterLimit: 1000000 }));
app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 100000,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "../frontend/dist/index.html"));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
