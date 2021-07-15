import React from "react";
import loginImg from "../assets/img/loginx.svg";
import "../assets/css/style.scss";
import { Link, Route, NavLink, useHistory } from "react-router-dom";
import Admin from "./Admin.js";
import { GoogleLogin } from "react-google-login";
import InstagramLogin from "react-instagram-oauth";

//GoogleOAuth data
const clientId =
  "165473491550-n2vqg5nucfo8ralusl59adqgbqu65so6.apps.googleusercontent.com";

//InstagramLogin data
const instagramAppId = "346267973657694";
const instagramAppSecret = "5bb4bd49966847971d24bb247118f1f9";

function Login() {
  const history = useHistory();

  //setting up Instagram connection
  const authHandler = (err, data) => {
    console.log(err, data);
    //needs to validate login
    //history.push("/admin/dashboard");
  };

  const onSuccess = (res) => {
    console.log("Successful login! Here is the user data:");
    console.log("GoogleId:", res.googleId);
    console.log("GoogleName:", res.profileObj.name);
    console.log("GoogleEmail:", res.profileObj.email);
    console.log("GoogleToken:", res.accessToken);
    history.push("/admin/dashboard");


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
        </div>
        <div>
          <label htmlFor="username">Or</label>
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <GoogleLogin
            clientId={clientId}
            buttonTest="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            style={{
              marginTop: "100px",
            }}
            isSignedIn={true}
          />

          <br />
          <br />

          <InstagramLogin
              authCallback={authHandler}
              appId={instagramAppId}
              appSecret={instagramAppSecret}
              redirectUri={"/admin/dashboard"}
          />

          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
export default Login;
