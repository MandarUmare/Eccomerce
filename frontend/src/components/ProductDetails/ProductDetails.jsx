import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, newReview } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import Loding from "../LOading/Loding";
import Reviews from "./Reviews";
import Header from "../Login/header/Header";
import { addtocart } from "../../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // const { product, loading } = useSelector((state)=>state.productDetails);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const {
    success,
    error: reviewError,
    loading: loadingReview,
  } = useSelector((state) => state.newReview);

  // console.log(product);
  console.log("dojsd");

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#FFD700",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      return;
    }
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addcartHandler = () => {
    dispatch(addtocart(id, quantity));
    toast.success("Item added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comments", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [success, dispatch, id, loadingReview, error, toast, reviewError]);

  return (
    <>
      <Header></Header>
      {loading ? (
        <Loding></Loding>
      ) : (
        <>
          <div className=" h-screen m-auto relative flex flex-wrap justify-center  bg-slate-100 items-center ">
            <div className="w-[30%] h-[80%]  object-fill flex bg-white p-4">
              <Carousel className="w-[100%] h-[100%]  ">
                {product.images.map((image) => (
                  <img src={image.url}></img>
                 
      ))}
              </Carousel>
            </div>
            <div className="w-[30%] h-[80%] px-8 bg-white flex flex-col p-4 ">
              <h1 className="text-4xl font-extrabold">{product.name}</h1>
              <p className="text-sm font-bold text-gray-400">company name</p>
              <div className="flex items-center">
                <div>
                  <ReactStars {...options}></ReactStars>
                </div>
                <div className="text-xs mx-2 text-gray-400">
                  ({product.reviews.length} reviews)
                </div>
              </div>
              <div className="text-2xl font-bold">₹{product.price}</div>
              <div>
                <button
                  onClick={decreaseQuantity}
                  className="bg-zinc-400 my-6 w-4 text-white"
                >
                  -
                </button>
                <input className="w-7 text-center " value={quantity}></input>
                <button
                  onClick={increaseQuantity}
                  className="bg-zinc-400 w-4 text-white"
                >
                  +
                </button>
                <button
                  onClick={addcartHandler}
                  className="px-4 bg-orange-500 rounded-[36px] mx-4 py-1 text-sm text-white
          "
                >
                  Add to cart
                </button>
              </div>
              <div>{product.description}</div>
              <div>
                <button
                  onClick={submitReviewToggle}
                  className="px-4 bg-orange-500 rounded-[36px] my-4 py-1 text-sm text-white"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Reviews></Reviews>
        </>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default ProductDetails;
