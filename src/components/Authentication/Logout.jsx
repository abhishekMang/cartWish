import React, { useEffect } from "react";
import { logOut } from "../../services/userService";

const Logout = () => {
  useEffect(() => {
    logOut();
    window.location = "/";
  }, []);

  return null;
};

export default Logout;
