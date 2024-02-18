import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Loginpage from "./pages/Loginpage.jsx";
import Signuppage from "./pages/Signuppage.jsx";
import Homepage from "./pages/Homepage.jsx";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import Products from "./components/products/Products.jsx";
import Search from "./components/Search/Search.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Shipping from "./components/Shipping/Shipping.jsx";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />}></Route>
          <Route path="/sign-up" element={<Signuppage />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route path="/search/:keyword" element={<Search></Search>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/shipping" element={<Shipping></Shipping>}></Route>
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </>
  );
};

export default App;
