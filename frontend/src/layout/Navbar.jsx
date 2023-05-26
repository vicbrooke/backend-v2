import React from "react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <section className="navbar">
      <div className="navbar-content">
        <div className="login">
          <LoginButton />
          <LogoutButton />
        </div>
        <div className="profile">
          <Profile />
        </div>
      </div>
      <h1>My App</h1>
      <div className="links">
        <Link to={"/"}>Home Page</Link>
        <Link to={"/endpoints"}>API Endpoints</Link>
        <Link to={"/articles"}>View Articles</Link>
      </div>
    </section>
  );
}

export default Navbar;
