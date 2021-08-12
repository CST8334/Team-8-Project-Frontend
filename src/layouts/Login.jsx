/**
*
* Coded by Chrishanthi Michael for CST8334 - Software Development Project
*
* this class is responsible to create the login page user interface
* and login with google account and instagram account
*
*/

// importing the libraries
//import React from "react";
import React, { Component } from "react";
import loginImg from "../assets/img/loginx.svg";
import "../assets/css/style.scss";
import axios from "axios";
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

// this onSubmit method is responsible for local user login
function onSubmit(){
    console.log("Local User Name is " +document.getElementById("username").value);
    console.log("Password is " +document.getElementById("password").value);

    // make sure the user enter the username and password for the local login
    // if the fields are not empty, make the call to the endpoint to validate the login
    if (document.getElementById("username").value != "" && document.getElementById("password").value != "")
    {
        // create the json object called loginData with username and password for call the login endpoint
        const loginData = {
            "user_type": "creator",
            "username": document.getElementById("username").value,
            "password": document.getElementById("password").value,
        };
        // call the backend login endpoint with login data
        axios.post(`http://localhost:8000/login/`, loginData)
            .then((response) => {
                // on success login, write the response to the console
                console.log(response);
                // Store the logintype data in local storage, this will be used in the logout function
                localStorage.setItem('logintype', "localaccount");

                //console.log(localStorage.getItem("logintype"));
                // on success login, redirect to the dashboard page.
                window.location.href = "http://localhost:3000/admin/dashboard";

            }, (error) => {
                // if the username or password is incorrect, alert the user
                var myWindow = window.alert("Local Login Failed. Please check the username and password")
            });
    }
    else
    {
        // if the user did not enter the username or password, just alert them to enter it
        var myWindow = window.alert("Please enter local username and password")
    }
}

function Login() {
  // initialize the user history instance that we can use to navigate
  const history = useHistory();

  //setting up Instagram connection
  const authHandler = (err, data) => {
    console.log(err, data);
    //needs to validate login
    //history.push("/admin/dashboard");
  };

  // log the response on onSuccess login
  // and push the url to admin dashboard
  const onSuccess = (res) => {
    console.log("Successful login! Here is the user data:");
    console.log("GoogleId:", res.googleId);
    console.log("GoogleName:", res.profileObj.name);
    console.log("GoogleEmail:", res.profileObj.email);
    console.log("GoogleToken:", res.accessToken);
    // store the google login type into the local storage to be used in logout function
    localStorage.setItem('logintype', "googleaccount");
    history.push("/admin/dashboard");


  };

  // log the response on onFailure
  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };

  // HTML Code to create the Login page
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
              id = "username"
              placeholder="Type your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Type your password"
            />

            <Link to="/forgot/password" className="float-right text-danger">
              Forgot Password?
            </Link>
            <br />
          </div>
        </div>
        <div className="footer">
            <button type="button" className="btn btn-primary" onClick={() => onSubmit()}>
              Login
            </button>
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
