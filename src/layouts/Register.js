import React from "react";
import loginImg from "../assets/img/loginx.svg";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.dataFunction.bind(this);

    this.state = {
      totalReactPackages: null,
    };
  }
  dataFunction() {
    console.log("logged");
    axios.get("http://127.0.0.1:8000/influencers/").then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div
        className="card"
        style={{
          width: "40%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "10%",
          backgroundColor: "#8A9CDC",
          boxShadow: "1px 1px darkgray",
        }}
      >
        <div className="card-body">
          <h4 style={{ textAlign: "center" }}>Sign Up</h4>
          <label for="username" className="form-label">
            Username
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
            />
          </div>

          <label for="password" className="form-label">
            Password
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>

          <div
            className="mt-3 mb-3"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "fit-content",
            }}
          >
            <h6>Select Your Social Media Account</h6>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />

              <label className="form-check-label" for="inlineRadio1">
                <img
                  src={require("layouts/icons8-youtube-48.png").default}
                  style={{ width: 50, height: 50 }}
                />
                YouTube
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />

              <label className="form-check-label" for="inlineRadio2">
                <img
                  src={require("layouts/icons8-instagram-48.png").default}
                  style={{ width: 50, height: 50 }}
                />
                Instagram
              </label>
            </div>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "35%" }}>
              Social Media Account
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Type your social media account here"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" style={{ width: "35%" }}>
              Invitation Code
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Type your invitation code here"
            />
          </div>

          <div
            className="mt-3"
            style={{ marginLeft: "auto", width: "fit-content" }}
          >
            <button type="button" className="btn btn-warning">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
