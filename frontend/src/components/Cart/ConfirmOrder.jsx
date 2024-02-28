import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../Metadata";
// import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
// import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  const Navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cartItems);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    Navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage p-14 flex sm:flex-row flex-wrap ">
        <div className="w-[60%]">
          <div className="confirmshippingArea ">
            <h1 className="text-2xl  font-bold">Shipping Info</h1>
            <div className="confirmshippingAreaBox mx-4 my-2 mt-8 ">
              <div className="flex mt-2">
                <p>Name: </p>
                <span className="ml-4">{user.username}</span>
              </div>
              <div className="flex mt-2">
                <p>Phone: </p>
                <span className="ml-4">{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex mt-2">
                <p>Address: </p>
                <span className="ml-4">{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems my-8">
            <h1 className="text-2xl font-bold">Your Cart Items:</h1>
            <div className="confirmCartItemsContainer mt-8 ">
              {cartItems &&
                cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="flex mt-4 justify-between items-center"
                  >
                    <img
                      className="w-32 h-28 overflow-hidden"
                      src={item.image}
                      alt="Product"
                    />
                    <Link className="relative " to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="border-solid border-t-[1px] sm:block hidden w-[1px] ml-14  transform-rotate-90  bg-zinc-400"></div>
        {/*  */}
        <div className="sm:w-[30%] ml-12  flex justify-center ">
          <div className="orderSummary w-[80%]">
            <h1 className="text-2xl font-bold">Order Summery</h1>
            <div className="border-solid  border-zinc-300 border-t-[1px] w-full mt-4"></div>
            <div className="w-64">
              <div className="flex justify-between mt-6">
                <p>Subtotal:</p>
                <span className="">₹{subtotal}</span>
              </div>
              <div className="flex justify-between mt-6">
                <p>Shipping Charges:</p>
                <span className="ml-4">₹{shippingCharges}</span>
              </div>
              <div className="flex justify-between mt-6">
                <p>GST:</p>
                <span className="">₹{tax}</span>
              </div>
            </div>
            <div className="border-solid  border-zinc-300 border-t-[1px] w-full mt-4"></div>
            <div className="orderSummaryTotal flex mt-6">
              <p>
                <b>Total:</b>
              </p>
              <span className="">₹{totalPrice}</span>
            </div>

            <button
              className="mt-8 shippingBtn  hover:bg-orange-600 bg-orange-500 px-4 text-white rounded-xl cursor-pointer w-full p-2"
              onClick={proceedToPayment}
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
