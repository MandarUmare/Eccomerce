import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../Metadata.jsx";
import SideBar from "./Sidebar.jsx";
import { UPDATE_USER_RESET } from "../../constants/userConstants.jsx";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userActions.js";
import Loader from "../LOading/Loding.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdMail } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!user || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.username);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated Successfully");
      Navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, toast, error, Navigate, isUpdated, updateError, user, id]);

  const updateUserSubmitHandler = (e) => {
    console.log("fskfkj");
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <div className="dashboard flex ">
        <SideBar />
        <div className="newProductContainer w-full  px-4 mx-6  rounded-lg  flex mt-10 flex-col h-screen items-center">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm bg-white  rounded-lg  min-h-[60%] flex items-center  flex-col"
              onSubmit={updateUserSubmitHandler}
            >
              <h1 className="text-3xl font-bold py-4 ">Update User</h1>

              <div className="flex mx-2 mt-8 items-center px-4">
                <IoMdPerson size={25}></IoMdPerson>
                <input
                  disabled
                  className="w-[100%] mx-2"
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-4  mx-2 flex items-center  px-4 ">
                <IoMdMail size={20}></IoMdMail>
                <input
                  disabled
                  className="w-[100%] mx-2"
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="my-4 w-[100%] mx-4  px-4">
                {/* <VerifiedUserIcon /> */}
                <select
                  className=" px-2 w-full"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                className="w-[90%] mt-8 shippingBtn  hover:bg-orange-600 bg-orange-500 px-4 text-white rounded-xl cursor-pointer p-2"
                id="createProductBtn"
                type="submit"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
