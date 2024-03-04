import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../actions/productActions.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MetaData from "../Metadata";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
} from "../../constants/productConstants.js";

// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { toast } from "react-toastify";

const ProductList = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { error, product } = useSelector((state) => state.adminProducts);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deletedProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      Navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProducts());
  }, [dispatch, alert, error, history, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 250,
      flex: 0.5,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 230,
      flex: 1,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 170,
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
        const { id } = params.row; // Assuming 'id' is the name of the property that contains the product ID
        return (
          <Fragment>
            <Link
              className=" p-2  hover:text-blue-600"
              to={`/admin/product/${id}`}
            >
              <MdEdit size={20}></MdEdit>
            </Link>

            <button
              className="p-2 hover:text-red-600"
              onClick={() => deleteProductHandler(id)}
            >
              <MdDelete size={20}></MdDelete>
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  product &&
    product.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard flex sm:flex-row flex-col  min-h-screen w-full">
        <SideBar />
        <div className="productListContainer mt-12 sm:mx-4 mx-4 sm:w-[75%] w-full sm:mt-8  ">
          <h1
            id="productListHeading"
            className="text-center mb-8 font-bold text-4xl"
          >
            ALL PRODUCTS
          </h1>
          {/* <Box sx={{ height: 520, width: "100%" }}> */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable bg-white sm:bg-zinc-100 sm:mx-0  w-[95%] sm:w-full"
            autoHeight
          />
          {/* </Box> */}
        </div>
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
    </Fragment>
  );
};

export default ProductList;
