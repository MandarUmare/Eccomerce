import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../Metadata";
import Loader from "../LOading/Loding";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === false) {
      Navigate("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      <MetaData title={`${user.username}'s Profile`} />
      <div className="profileContainer flex  w-[100%]">
        <div className="flex flex-col items-center mx-10 my-10">
          <h1 className="text-5xl text-orange-500 font-bold">My Profile</h1>
          <img
            className="w-80 mt-8 h-80 my-2 rounded-full "
            src={user.avtar.url}
            alt={user.name}
          />
          <Link
            className="px-4 mb-3 bg-indigo-500 mt-7 rounded-[36px]  py-1 text-sm w-[40%] text-center font-semibold text-white"
            to="/me/update"
          >
            Edit Profile
          </Link>
        </div>
        <div className="mx-44 h-screen min-w-[40%] flex flex-col py-10 my-20 ">
          <div>
            <h4 className="text-3xl  mb-3 font-semibold">Full Name</h4>
            <p className="mb-8">{user.username}</p>
          </div>
          <div>
            <h4 className="text-3xl  mb-3 font-semibold">Email</h4>
            <p className="mb-8">{user.email}</p>
          </div>
          <div>
            <h4 className="text-3xl  mb-3 font-semibold">Role</h4>
            <p className="mb-8">{user.role}</p>
          </div>

          <div className="px-4 mb-3 hover:bg-orange-600  bg-orange-500 rounded-[36px]  py-1 text-sm w-[30%] text-center font-semibold text-white">
            <Link to="/orders">My Orders</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
