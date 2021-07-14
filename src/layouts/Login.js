import React from "react";
import loginImg from "../assets/img/loginx.svg";
import "../assets/css/style.css";
import { Link, Route, NavLink } from "react-router-dom";
import Admin from "./Admin.js";
import { GoogleLogin } from "react-google-login";

const clientId =
  "165473491550-n2vqg5nucfo8ralusl59adqgbqu65so6.apps.googleusercontent.com";

function Login() {
  const onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };

  return (
    <div
      className="p-1"
      style={{
        backgroundColor: "#6495ED ",
        width: 325,
        marginRight: "auto",
        marginTop: "8%",
        marginRight: "auto",
        marginLeft: "auto",
      }}
    >
      <div className="base-container">
        <div className="header">DreamWell Login</div>
        <label htmlFor="signup"> Doesn't have an account? </label>
        <NavLink to="/register">Signup</NavLink>

        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Type your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              placeholder="Type your password"
            />

            <Link to="/forgot/password" className="float-right text-danger">
              Forgot Password?
            </Link>
            <br />
          </div>
        </div>
        <div className="footer">
          <NavLink to="/admin/dashboard">
            <button type="button" className="btn btn-primary">
              Login
            </button>
          </NavLink>
          <br />
          <label htmlFor="username">Or</label>
          <br />
          <br />
        </div>

        <div>
          <GoogleLogin
            clientId={clientId}
            buttonTest="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            style={{ marginTop: "100px" }}
            isSignedIn={true}
          />

          <br />
          <br />
          <a href="#" class="instagram btn">
            <i class=" fab fa-instagram">&nbsp;&nbsp;&nbsp;&nbsp;</i> Login with
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
export default Login;
