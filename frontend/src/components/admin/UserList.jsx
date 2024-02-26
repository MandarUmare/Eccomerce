import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../Metadata";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import SideBar from "./Sidebar";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../actions/userActions.js";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";

const UsersList = () => {
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      toast.success("User deleted Sucessfully");
      Navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, toast, error, deleteError, Navigate, isDeleted, message]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 250,
      flex: 0.8,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: "statusHeader text-lg text-white bg-orange-500",

      cellClassName: (params) => {
        const role = params.value; // Retrieve the value of the 'status' field
        return role === "admin" ? "text-green-500" : "text-red-500";
      },
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
        const { id } = params.row;
        return (
          <Fragment>
            <Link
              className=" p-2  hover:text-blue-600"
              to={`/admin/user/${id}`}
            >
              <MdEdit size={20}></MdEdit>
            </Link>

            <button
              className="p-2 hover:text-red-600"
              onClick={() => deleteUserHandler(id)}
            >
              <MdDelete size={20}></MdDelete>
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard flex sm:flex-row flex-col  min-h-screen w-full">
        <SideBar />
        <div className="productListContainer mt-12 sm:mx-4 mx-4 sm:w-[75%] w-full sm:mt-8">
          <h1
            id="productListHeading"
            className="text-center mb-8 font-bold text-4xl"
          >
            ALL USERS
          </h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable bg-white sm:bg-zinc-100 px-2 w-full"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
