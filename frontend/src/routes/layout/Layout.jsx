import React from "react";
import "./Layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      {" "}
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet/>
        </div>
        //{" "}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Layout;
