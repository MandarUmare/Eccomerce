var express = require("express");
var router = express.Router();
const userModel = require("../model/user");
const productModel = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { authorizeRole } = require("../middleware/authorizeRole");
const passport = require("passport");
const orderModel = require("../model/orderModel");
const cloudinary = require("cloudinary").v2;
require("../middleware/passport");

router.get(
  "/filteredProduct",
  passport.authenticate("jwt", { session: false }),
  catchAsyncErrors(async function (req, res, next) {
    const { category, price, sortBy, page, perPage, ratings } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (price) {
      filter.price = { $lte: parseFloat(price) };
    }

    const sortOptions = {};

    if (ratings) {
      filter.ratings = { $gte: parseFloat(ratings) };
    }

    //Add sorting options if provided
    if (sortBy) {
      const [field, order] = sortBy.split(":");
      sortOptions[field] = order === "desc" ? -1 : 1;
    }

    const pageNumber = parseInt(page, 10) || 1;
    const itemsPerPage = parseInt(perPage, 10) || 11;

    try {
      const totalProducts = await productModel.countDocuments(filter);
      const totalPages = Math.ceil(totalProducts / itemsPerPage);

      const paginatedProducts = await productModel
        .find(filter)
        .sort(sortOptions)
        .skip((pageNumber - 1) * itemsPerPage)
        .limit(itemsPerPage);

      res.json({
        data: paginatedProducts,
        meta: {
          totalProducts,
          totalPages,
          currentPage: pageNumber,
          itemsPerPage,
        },
      });
    } catch (error) {
      
      res.status(500).send("Internal Server Error");
    }
  })
);


router.get(
  "/adminProduct",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  catchAsyncErrors(async function (req, res, next) {
    const product = await productModel.find();
    res.status(200).json({
      product,
    });
  })
);

router.post(
  "/admin/createproduct",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  catchAsyncErrors(async function (req, res, next) {
    let images = [];

   
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];
   
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await productModel.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  })
);

router.delete(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  catchAsyncErrors(async function (req, res, next) {
    const product = await productModel.deleteOne({ _id: req.params.id });
    res.status(201).json({
      success: true,
    });
  })
);

router.put(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  catchAsyncErrors(async function (req, res, next) {
    let product = await productModel.findById(req.params.id);
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    // Images Start Here
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLinks;
    }

    console.log(req.body);
    product = await productModel.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({
      success: true,
      product,
    });
  })
);

router.get(
  "/getSingleproduct/:id",
  
  catchAsyncErrors(async function (req, res, next) {
    const product = await productModel.findOne({ _id: req.params.id });

    res.json(product);
  })
);

router.get(
  "/find/:productname",
  passport.authenticate("jwt", { session: false }),
  catchAsyncErrors(async function (req, res, next) {
    const searchTerm = req.params.productname; // Replace this with the actual search term provided by the user

    // Create a regex pattern using the dynamic search term
    const regexPattern = new RegExp(`^${searchTerm}`, "i");

    // Find users whose usernames start with the dynamic search term
    const products = await productModel.find({
      name: { $regex: regexPattern },
    });
    console.log(products);
    res.json(products);
  })
);

router.put(
  "/addReview",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const user = await userModel.findOne({ username: req.user.username });
    console.log(user);
    console.log("fsbkhfk");
    const review = {
      userId: user._id,
      username: req.user.username,
      comments: req.body.comments,
      rating: Number(req.body.rating),
    };

    const product = await productModel.findOne({ _id: req.body.productId });

    const isReviewed = product.reviews.find(
      (review) => review.userId.toString() === req.user._id.toString()
    );

    console.log(review.userId);
    if (isReviewed && product.reviews) {
      product.reviews.forEach((review) => {
       
        if (review.userId.toString() === req.user._id.toString()) {
          (review.rating = req.body.rating),
            (review.comments = req.body.comments);
        }
      });
    } else {
      product.reviews.push(review);

      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((review) => {
      avg += review.rating;
    });

    product.ratings = avg / product.reviews.length;
    await product.save();
    res.send(product);
  }
);

router.get("/fetchreviews", async function (req, res, next) {
  try {
    const productId = req.query.idm; // Assuming the query parameter is named "idm"
    const product = await productModel.findOne({ _id: productId });

    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      next(err);
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.delete(
  "/deleteReview",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {
    const product = await productModel.findOne({ _id: req.query.productId });

    if (!product) {
      const err = new Error("Product not found");
      err.status = 404;
      next(err);
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id
    );
    let avg = 0;
    reviews.forEach((review) => {
      avg += review.rating;
    });
    const ratings = 0;
    if (avg != 0) {
      ratings = avg / reviews.length;
    }
    const numOfReviews = reviews.length;
    await productModel.findOneAndUpdate(
      { _id: req.query.productId },
      { reviews, ratings, numOfReviews }
    );

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);

module.exports = router;
