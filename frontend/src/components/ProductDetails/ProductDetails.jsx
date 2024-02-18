import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import Loding from "../LOading/Loding";
import Reviews from "./Reviews";
import Header from "../Login/header/Header";
import { addtocart } from "../../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  // const { product, loading } = useSelector((state)=>state.productDetails);
  const { product, loading } = useSelector((state) => state.productDetails);
  console.log(product);
  console.log("dojsd");
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

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
                <img src={product.image.url}></img>
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
                <button className="px-4 bg-orange-500 rounded-[36px] my-4 py-1 text-sm text-white">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
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
