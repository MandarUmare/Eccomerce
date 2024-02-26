import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productActions.js";
import { toast } from "react-toastify";
import MetaData from "../Metadata";
// import AccountTreeIcon from "@material-ui/icons/AccountTree";
// import DescriptionIcon from "@material-ui/icons/Description";
// import StorageIcon from "@material-ui/icons/Storage";
// import SpellcheckIcon from "@material-ui/icons/Spellcheck";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      Navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    console.log("surprise");
    e.preventDefault();
    console.log("second surprise");
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("surprise");
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="flex bg-none sm:flex-row flex-col mx-4 mt-4">
        <SideBar />
        <div className="newProductContainer w-full  sm:p-4 sm:mx-6  rounded-lg  flex justify-center flex-col h-screen items-center">
          <h1 className="text-3xl font-bold mb-4">Create Product</h1>
          <form
            className="createProductForm bg-white rounded-lg   min-h-[60%] flex justify-center items-center flex-col"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <div className="my-4 w-[100%] px-4">
              {/* <SpellcheckIcon /> */}
              <input
                className="w-[100%]"
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my-4 w-[100%] px-4">
              {/* <AttachMoneyIcon /> */}
              <input
                className="w-[100%]"
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="my-4 w-[100%] px-4">
              {/* <DescriptionIcon /> */}

              <textarea
                className="w-[100%]"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div className="my-4 w-[100%] px-4">
              {/* <AccountTreeIcon /> */}
              <select
                className="w-[100%]"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-4 w-[100%] px-4">
              {/* <StorageIcon /> */}
              <input
                className="w-[100%]"
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="my-4 w-32 px-4" id="createProductFormFile">
              <input
                className="w-[100%]"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div
              className="my-4 mb-0 w-[20%] h-[40%] flex justify-center px-4"
              id="createProductFormImage"
            >
              {imagesPreview.map((image, index) => (
                <img
                  className="mx-4"
                  key={index}
                  src={image}
                  alt="Product Preview"
                />
              ))}
            </div>

            <button
              className="w-[100%] mt-8 shippingBtn  hover:bg-orange-600 bg-orange-500 px-4 text-white rounded-xl cursor-pointer p-2"
              id="createProductBtn"
              type="submit"
              // disabled={loading ? true : false}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
