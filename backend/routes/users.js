var express = require("express");
var router = express.Router();
const { hashSync, compareSync } = require("bcrypt");
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { authorizeRole } = require("../middleware/authorizeRole");
require("../middleware/passport");

// user route

router.put(
  "/updateMe",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const users = await userModel.findOne({ username: req.user.username });
    console.log(users + "vjvhj");
    users.username= req.body.username,
    users.address= req.body.address,
    users.city= req.body.city,
    users.country= req.body.country,
    users.postalCode= req.body.postalCode,
    await users.save({ validateBeforeSave: false });
    res.send(users);
  }
);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const userDetails = await userModel.findOne({
      username: req.user.username,
    });
    console.log(req.user.role);
    res.send(userDetails);
  }
);

//admin routes
router.get(
  "/admin/getAllUsers",

  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  async function (req, res) {
    const users = await userModel.find();
    res.json(users);
  }
);

router.get(
  "/admin/getuser/:id",

  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  async function (req, res) {
    const user = await userModel.findOne({ _id: req.params.id });
    res.json(user);
  }
);

router.put(
  "/admin/updateUserRole/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  async function (req, res) {
    const user = await userModel.findOneAndUpdate(
      { _id: req.params.id },
      { role: req.body.role }
    );
    console.log(user.role);
    res.send("role updated");
  }
);

router.delete(
  "/admin/deleteUser/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  async function (req, res) {
    const user = await userModel.findOneAndDelete({ _id: req.params.id });

    res.send("deleted");
  }
);
// Authentication
router.post("/register", function (req, res, next) {
  const user = new userModel({
    username: req.body.username,
    email: req.body.email,
    password: hashSync(req.body.password, 10),
  });

  user.save();
  const payload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(payload, "Jai Siya Ram", { expiresIn: "1d" });

  res.status(200).send({
    sucess: true,
    message: "Logged in sucessfully",
    token: "Bearer " + token,
  });
});

router.post("/login", async function (req, res) {
  const user = await userModel.findOne({ username: req.body.username });

  console.log(user);
  if (!user) {
    return res.status(401).send({
      sucess: false,
      message: "user not found",
    });
  }

  if (!compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      sucess: false,
      message: "Incoorect password",
    });
  }
  const payload = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(payload, "Jai Siya Ram", { expiresIn: "1d" });

  return res.status(200).send({
    sucess: true,
    message: "Logged in sucessfully",
    token: "Bearer " + token,
  });
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.status(200).send({
      success: true,
      message: "Protected route fetched",
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);

module.exports = router;
