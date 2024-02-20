import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col  justify-center  items-center h-screen">
      <FaCheckCircle className="animate-pulse my-2" size={84} color="#ff9000" />
      <h1 className="text-2xl my-2">Your order has been placed!</h1>
      <Link
        className="text-2xl my-4 bg-zinc-800 text-white px-4 py-2"
        to="/orders"
      >
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
