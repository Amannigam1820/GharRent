import React, { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserInfoQuery } from "../../redux/api/api";


const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  
 

  
  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>GharRent</span>
        </Link>
        <Link to="/list">Property</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>

      <div className="right">
        {user ? (
          <div className="user">
            <img src={user.avatar || "noavatar.jpg"} alt="" />
            <span>{user.username}</span>
            <Link className="profile" to="/profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            {" "}
            <a href="/register">Sign up</a>
            <a href="/login" className="register">
              Log in
            </a>{" "}
          </>
        )}

        <div className="menuIcon">
          <img src="menu.png" alt="" onClick={() => setOpen((prev) => !prev)} />
        </div>

        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign up</a>
          <a href="/">Log in</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
