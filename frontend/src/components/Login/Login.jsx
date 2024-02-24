import { React, useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveUser } from "../../actions/userActions.js";

// import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/users/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // dispatch(saveUser(response.data));
       
        Navigate("/home");
        toast.success("Logged IN Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submit = (data) => {
    axios
      .post("http://localhost:8000/users/login", data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(saveUser(response.data.user));
        Navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(submit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  required
                  {...register("username")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  {...register("password")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute top-2 right-2"
                    size={25}
                    onClick={() => setVisible(false)}
                  ></AiOutlineEye>
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute top-2 right-2"
                    size={25}
                    onClick={() => setVisible(true)}
                  ></AiOutlineEyeInvisible>
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
