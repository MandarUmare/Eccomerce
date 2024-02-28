import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { ToastContainer, toast } from "react-toastify";
import { MdEventNote } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa6";
import { MdVpnKey } from "react-icons/md";

import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Metadata from "../Metadata";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createOrder } from "../../actions/orderAction";

const Payment = () => {
  const Navigate = useNavigate();
  const payBtn = useRef(null);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cartItems);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  //   console.log(user);
  //   console.log("this is user");
  const paymentdata = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://multivendor-eccomerce.onrender.com/payment/process/payment",
        paymentdata,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.username,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if ((result.paymentIntent.status = "succeeded")) {
          order.paymentinfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          console.log(order);
          dispatch(createOrder(order));
          Navigate("/success");
        } else {
          toast.error("There is some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
    <>
      <Metadata title={"Payment"}></Metadata>
      <CheckoutSteps activeStep={2}></CheckoutSteps>
      <div className="paymentContainer flex justify-center  items-center mt-10">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <h1 className="text-4xl font-bold ">Card Info</h1>
          <div className="my-6 mt-8 flex items-center justify-center ">
            <FaCreditCard size={25} />
            <CardNumberElement className="mx-4 w-40 px-2 paymentInput border-2" />
          </div>
          <div className="my-6 flex items-center justify-center ">
            <MdEventNote size={25} />
            <CardExpiryElement className="mx-4 w-40 px-2 paymentInput border-2" />
          </div>
          <div className="my-6 flex items-center justify-center ">
            <MdVpnKey size={25} />
            <CardCvcElement className="mx-4 w-40 px-2 paymentInput border-2" />
          </div>
          <input
            className="my-6 flex  mt-8 text-center items-center justify-center hover:bg-orange-600 bg-orange-500 px-4 text-white rounded-lg cursor-pointer w-52 p-2"
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
