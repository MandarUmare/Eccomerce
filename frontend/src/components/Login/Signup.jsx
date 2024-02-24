import { React, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IoMdMail } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { saveUser } from "../../actions/userActions.js";

const Singup = () => {
  const Navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});


  useEffect(()=>{
    const token=localStorage.getItem("token");
    axios.get("http://localhost:8000/users/protected",{headers:{
        Authorization:token,
    }}).then((response)=>{
        Navigate("/home");
    }).catch((err)=>{
        console.log(err);
    })
  },[]);

  const submit=(data)=>{
    data.avtar=avatar;
              axios.post("http://localhost:8000/users/register",data).then((response)=>{
                console.log(response.data);
                localStorage.setItem("token",response.data.token);
                dispatch(saveUser(response.data.user));
                Navigate("/home");
              
              }).catch((err)=>{
                console.log(err);
              })
  }
  
  const createAvtarImageChange=(e)=>{
  const file=e.target.files;
  const reader=new FileReader();

  reader.onload=()=>{
    if(reader.readyState==2){
      setAvatar(reader.result);
    }
  }

  reader.readAsDataURL(file[0]);
  

  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(submit)}
            encType="multipart/form-data"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  autoComplete="name"
                  required
                  // onChange={(e) => setName(e.target.value)}
                  {...register("username")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  // onChange={(e) => setEmail(e.target.value)}
                  {...register("email")}
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
                  required
                  // onChange={(e) => setPassword(e.target.value)}
                  {...register("password")}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    onChange={createAvtarImageChange}
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    className="sr-only"
                  />
                </label>
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
              <h4>Already have an account?</h4>
              <Link to="/" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Singup;
