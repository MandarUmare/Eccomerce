import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../Metadata";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SideBar from "./Sidebar";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      Navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, toast, error, deleteError, Navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0,
    headerClassName: "statusHeader text-lg text-white bg-orange-500",
  },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.2,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
      cellClassName: (params) => {
        const status = params.value; // Retrieve the value of the 'status' field
        return status === "Delivered" ? "text-green-500" : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",

    },

    {
      field: "actions",
      flex: 0.1,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",

      renderCell: (params) => {
        const { id } = params.row; // Assuming 'id' is the name of the property that contains the product ID
        return (
          <Fragment>
            <Link
              className=" p-2  hover:text-blue-600"
              to={`/admin/order/${id}`}
            >
              <MdEdit size={20}></MdEdit>
            </Link>

            <button
              className="p-2 hover:text-red-600"
              onClick={() => deleteOrderHandler(id)}
            >
              <MdDelete size={20}></MdDelete>
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard flex sm:flex-row flex-col  min-h-screen w-full">
        <SideBar />
        <div className="productListContainer mt-12 sm:mx-4 mx-4 sm:w-[75%] w-full sm:mt-8  ">
          <h1
            id="productListHeading"
            className="text-center mb-8 font-bold text-4xl"
          >
            ALL ORDERS
          </h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable bg-white sm:bg-zinc-100 mx-4"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
