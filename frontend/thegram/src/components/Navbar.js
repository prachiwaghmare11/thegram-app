import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
export default function Navbar(login) {
  const navigate = useNavigate();
  const LoginStatus = () => {
    const { setModalOpen } = useContext(LoginContext);
    console.log(localStorage.getItem("jwt"));
    const token = localStorage.getItem("jwt");
    if (login && token) {
      return [
        <>
          <Link to="createPost">
            <li>Create Post</li>
          </Link>
          <Link style={{ marginLeft: "25px" }} to="followingpost">
            My Following
          </Link>
          <Link to="profile">
            {" "}
            <li>Profile</li>
          </Link>
          <Link to={""}>
            <li>
              <button className="primaryBtn" onClick={() => setModalOpen(true)}>
                Log Out
              </button>
            </li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="signup">
            <li>Sign Up</li>
          </Link>
          <Link to="signin">
            {" "}
            <li>Sign In</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <img
        src={logo}
        alt="Logo"
        onClick={() => {
          navigate("/");
        }}
      />
      <ul className="nav-menu">{LoginStatus()}</ul>
    </div>
  );
}
