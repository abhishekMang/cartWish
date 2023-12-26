import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import UserContext from "./contexts/UserContext";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { getJwt, getUser } from "./services/userService";
import setAuthToken from "./components/utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartServices";
import "react-toastify/dist/ReactToastify.css";
import CartContext from "./contexts/CartContext";

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    try {
      const jwtUser = getUser();
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (error) {}
  }, []);

  const addToCart = (product, quantity) => {
    console.log(product, quantity);
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    // console.log("Product Index", productIndex);
    // console.log("Updated cart", updatedCart);
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);

    // console.log("#===#");
    // console.log(product._id, quantity);

    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("Product added successfully");
        // toast.error("Product added successfully");
        // toast.warning("Product added successfully");
        // toast.info("Product added successfully");
        // toast("Product added successfully");

        // console.log(res.data);
      })
      .catch((err) => {
        toast.error("Failed to add Product");
        setCart(cart);
      });
  };

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  const updateCart = (type, id) => {
    const oldCart = [...cart];
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === id
    );

    if (type === "increase") {
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
      increaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
    }

    if (type === "decrease") {
      updatedCart[productIndex].quantity -= 1;
      setCart(updatedCart);

      decreaseProductAPI(id).catch((err) => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
    }
  };

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id != id);

    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
      toast.error("Something went wrong!");
      setCart(oldCart);
    });
  };

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={addToCart}>
        <div className="app">
          <Navbar cartCount={cart.length} />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing
              cart={cart}
              // addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateCart={updateCart}
              setCart={setCart}
            />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
