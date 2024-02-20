import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loading from "../LOading/Loding";
import { Link } from "react-router-dom";
import MetaData from "../Metadata";
import { toast } from "react-toastify";
import { FaExternalLinkAlt } from "react-icons/fa";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      headerClassName: "statusHeader  text-lg text-white bg-orange-500",
      minWidth: 300,
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,

      headerClassName: "statusHeader text-lg text-white bg-orange-500",
      cellClassName: (params) => {
        return params.value === "Delivered" ? "text-green-500" : "text-red-500";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <FaExternalLinkAlt></FaExternalLinkAlt>
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.username} - Orders`} />
      <h1 className="text-5xl font-bold mx-8 my-4">My Orders</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="myOrdersPage m-8 ">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable bg-white"
            autoHeight
          />

          <h1 id="myOrdersHeading">{user.username}'s Orders</h1>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
