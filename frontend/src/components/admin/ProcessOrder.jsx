import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../Metadata";
import { Link, useNavigate, useParams } from "react-router-dom";

import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../LOading/Loding";

import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { toast } from "react-toastify";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const Navigate = useNavigate();
  const { id } = useParams();
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, toast, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="dashboard flex sm:flex-row flex-col  min-h-screen w-full">
        <SideBar />
        <div className="newProductContainer  w-screen  p-4 sm:mx-6  rounded-lg  flex justify-center flex-col min-h-screen items-center">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage w-[80%]  bg-white rounded-lg  min-h-[60%] flex  items-center flex-col"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div className="w-full mt-8 px-6">
                <div className="confirmshippingArea">
                  <h1 className="text-2xl mt-4 mb-2 font-semibold">
                    Shipping Info
                  </h1>
                  <div className="orderDetailsContainerBox">
                    <div className="flex ">
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div className="flex ">
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div className="flex ">
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <h1 className="text-2xl mt-4 mb-2 font-semibold">Payment</h1>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {order.paymentinfo &&
                        order.paymentinfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div className="flex ">
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <h1 className="text-2xl mb-2 mt-4 font-semibold">Status</h1>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems ">
                  <h1 className="text-2xl mt-4 mb-2 font-semibold">
                    Cart Items:
                  </h1>
                  <div className="confirmCartItemsContainer justify-between">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div
                          className="flex justify-between my-6 shadow-lg p-4 shadow-slate-300"
                          key={item.product}
                        >
                          <img
                            className="w-24 h-24 justify-around"
                            src={item.image}
                            alt="Product"
                          />
                          <Link to={`/product/${item.product}`}>
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
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1 className="text-2xl mt-4 mx-8 mb-2 font-semibold">
                    Process Order
                  </h1>

                  <div className="mx-8 shadow-sm shadow-slate-300 p-2 rounded-lg w-44">
                    {/* <AccountTreeIcon /> */}
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <button
                    className="w-[100%] mt-8 shippingBtn mx-4  hover:bg-orange-600 bg-orange-500 px-4 text-white rounded-xl cursor-pointer p-2"
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
