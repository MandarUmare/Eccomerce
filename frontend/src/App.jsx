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
import CategoryProducts from "./components/Categories.jsx/CategoryProducts.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProtectedRoute from "./components/Protected/ProtectedRoute.jsx";
import Header from "./components/Login/header/Header.jsx";
import { useSelector } from "react-redux";

const App = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.user);
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
        {isAuthenticated ? <Header></Header> : null}
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/sign-up" element={<Signuppage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search/:keyword"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist></Wishlist>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:name"
            element={
              <ProtectedRoute>
                <CategoryProducts></CategoryProducts>
              </ProtectedRoute>
            }
          />
          <Route
            path="/process/payment"
            element={
              <ProtectedRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess></OrderSuccess>
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrder></MyOrder>
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails></OrderDetails>
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard></Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ProductList></ProductList>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product"
            element={
              <ProtectedRoute>
                <NewProduct></NewProduct>
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <NewProduct></NewProduct>
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Profile></Profile>
              </ProtectedRoute>
            }
          />
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
