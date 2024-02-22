import React, { useEffect, useState } from "react";
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
import Shipping from "./components/Cart/Shipping.jsx";
import ConfirmOrder from "./components/Cart/ConfirmOrder.jsx";
import axios from "axios";
import Payment from "./components/Cart/Payment.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.jsx";
import MyOrder from "./components/orders/MyOrder.jsx";
import OrderDetails from "./components/orders/OrderDetails.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";
import ProductList from "./components/admin/ProductList.jsx";
import NewProduct from "./components/admin/NewProduct.jsx";
import Wishlist from "./components/wishlist/Wishlist.jsx";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    const fetchStripeApiKey = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/payment/stripeapikey"
        );
        setStripeApiKey(data.stripeApiKey);
      } catch (error) {
        console.error("Error fetching Stripe API key:", error);
      }
    };

    fetchStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/sign-up" element={<Signuppage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/wishlist" element={<Wishlist></Wishlist>} />
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
          <Route path="/success" element={<OrderSuccess></OrderSuccess>} />
          <Route path="/orders" element={<MyOrder></MyOrder>} />
          <Route path="/order/:id" element={<OrderDetails></OrderDetails>} />
          <Route path="admin/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="/admin/products" element={<ProductList></ProductList>} />
          <Route path="/admin/product" element={<NewProduct></NewProduct>} />
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
