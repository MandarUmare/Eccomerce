import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
// import "./dashboard.css";
// import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";

import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userActions.js";
import { LineChart } from "@mui/x-charts/LineChart";
import MetaData from "../Metadata";
import { PieChart } from "@mui/x-charts/PieChart";
import { getAdminProducts } from "../../actions/productActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.adminProducts);
  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  product &&
    product.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;

  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  let products = { length: 10 };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, product.length - outOfStock],
      },
    ],
  };

  const onFilter = () => {
    if (display === "hidden") {
      setDisplay("block");
    } else {
      setDisplay("hidden");
    }
  };
  return (
    <div className="dashboard flex sm:flex-row flex-col  min-h-screen w-full">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer w-full p-4 sm:mx-6  my-4 flex justify-center flex-col">
        {/* <Typography component="h1">Dashboard</Typography> */}
        <div className="flex justify-center">
          <p className="text-center text-2xl p-4 bg-violet-100 w-full font-semibold">
            Total Amount <br /> ₹{totalAmount}
          </p>
        </div>
        <div className="dashboardSummary flex justify-center ">
          <div className="dashboardSummaryBox2 flex sm:flex-row flex-col justify-between my-6">
            <Link
              className="w-32 h-32  bg-red-300 sm:mt-0 mt-8 rounded-full text-center items-center flex flex-col justify-center mx-8 text-white text-2xl"
              to="/admin/products"
            >
              <p>Products</p>
              <p className="">{product && product.length}</p>
            </Link>
            <Link
              className="w-32 h-32 sm:mt-0 mt-8  bg-orange-300 rounded-full text-center items-center flex flex-col justify-center mx-8 text-white text-2xl"
              to="/admin/orders"
            >
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link
              className="w-32 h-32 sm:mt-0 mt-8 bg-zinc-500 rounded-full text-center items-center flex flex-col justify-center mx-8 text-white text-2xl"
              to="/admin/users"
            >
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={500}
            hoverBackgroundColor={"#B3BFF1"}
          />
        </div>

        <div className="doughnutChart w-full my-28 h-screen">
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: product.length - outOfStock,
                    label: "In Stock",
                  },
                  { id: 1, value: outOfStock, label: "Out of Stock" },
                ],
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
