import React from "react";
import CartItems from "./CartItems";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Login/header/Header";
import { removeFromCart } from "../../actions/cartActions";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cartItems);
  
  const dispatch = useDispatch();
  
  let total = 0;
  cartItems.map((item, index) => {
    console.log(typeof item.price);
    console.log(typeof item.quantity);
    if (item.price && item.quantity) {
      total = total + parseInt(item.price, 10) * parseInt(item.quantity, 10);
    }
  });

  return (
    <>
      

      <div className="mb-32 p-6 py-12">
        {cartItems.length > 0 ? (
          <div className="bg-orange-500 flex  justify-between px-8 py-2 text-white font-semibold">
            <div>Product</div>
            <div className="relative left-56 ml-4">Quantity</div>
            <div>Subtotal</div>
          </div>
        ) : null}
        {cartItems.map((item, index) => (
          <CartItems item={item} key={item.product}></CartItems>
        ))}

        {cartItems.length > 0 ? (
          <div className="flex  flex-row justify-between mb-10 right-0 absolute mx-10 px-8 text-white  text-xl font-bold bg-blue-500 py-1 rounded-sm w-[35%] ">
            <span>Total</span>
            <span> ₹{total}</span>
            <Link to="/Shipping">
              <button className="bg-orange-500 font-medium px-2 my-8 py-1  rounded-[36px] w-[75%] absolute right-0 top-8">
                Checkout
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col justify-center m-4 h-44 text-3xl font-semibold text-zinc-400 items-center">
            No items in the cart
            <Link to={"/products"}>
              <button className="px-4 py-2 m-4 text-lg mt-10 text-white bg-indigo-500 rounded-md">
                View Products
              </button>
            </Link>
          </div>
        )}
      </div>
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

export default Cart;
