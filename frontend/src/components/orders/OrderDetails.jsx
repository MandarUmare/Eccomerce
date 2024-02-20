import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Metadata";
import { Link, useParams } from "react-router-dom";

import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../LOading/Loding";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <h1 className="text-4xl mx-8 text-orange-500" component="h1">
                Order #{order && order._id}
              </h1>
              <h1 className="text-3xl font-semibold mx-8 mt-6 mb-2">
                Shipping Info
              </h1>
              <div className="orderDetailsContainerBox mx-12 ">
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
              <h1 className="text-3xl font-semibold mx-8 mt-6 mb-2">Payment</h1>
              <div className="orderDetailsContainerBox mx-12 mt-4">
                <div>
                  <p
                    className={
                      order.paymentinfo &&
                      order.paymentinfo.status === "succeeded"
                        ? "text-green-600 font-semibold"
                        : "text-red-500 font-semibold"
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
                  <span className="mx-1">
                    ₹{order.totalPrice && order.totalPrice}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-semibold mx-8 mt-6 mb-2">
                Order Status
              </h1>
              <div className="orderDetailsContainerBox mx-12 ">
                <div className="flex ">
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "text-green-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <h1 className="text-3xl font-semibold mx-8 mt-6 mb-2">
                Order Items:
              </h1>
              <div className="orderDetailsCartItemsContainer  mt-4 mx-12 ">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex mt-2 shadow-slate-400 px-4 py-2 shadow-md  my-2 items-center justify-between"
                    >
                      <img
                        className="w-32 h-32"
                        src={item.image}
                        alt="Product"
                      />
                      <Link className="text-xl" to={`/product/${item.product}`}>
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
