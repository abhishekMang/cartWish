import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignUpPage from "../Authentication/SignupPage";
import Logout from "../Authentication/Logout";
import { addToCartAPI } from "../../services/cartServices";

const Routing = ({ cart, removeFromCart, updateCart }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route
        path="/cart"
        element={
          <CartPage
            cart={cart}
            removeFromCart={removeFromCart}
            updateCart={updateCart}
          />
        }
      />
      <Route path="/myorders" element={<MyOrderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default Routing;
