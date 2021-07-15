import React from "react";
import loginImg from "../assets/img/loginx.svg";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.dataFunction.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.changeModalState = this.changeModalState.bind(this);

        this.state = {
            totalReactPackages: null,
            usernameInput: '',
            passwordInput: '',
            showModal: false
        };
    }

    dataFunction() {
        console.log("logged");
        axios.get("http://127.0.0.1:8000/influencers/").then((response) => {
            console.log(response);
        });
    }

    changeModalState(showModal) {
        this.setState({ showModal, passwordInput: this.state.passwordInput, usernameInput: this.state.usernameInput });
    }

    handleUsernameChange(event) {
        this.setState({ usernameInput: event.target.value, passwordInput: this.state.passwordInput });
    }

    handlePasswordChange(event) {
        this.setState({ usernameInput: this.state.usernameInput, passwordInput: event.target.value });
    }

    registerUser() {
        axios.post('http://localhost:8000/new-creator/',
            {
                "user_type": "creator",
                "email": this.state.usernameInput,
                "password": this.state.passwordInput,
                "organization_id": 333,
                "user_role": "user",
                "description": "A brand new user!"
            }
        ).then((response) => {
            this.changeModalState(true);
            console.log(this.state);
        }, (error) => {
            console.log(error);
            alert('Error occurred, check console for details');
        });
    }

    render() {
        return (
            <>
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
                        <label for="username" className="form-label" style={{ color: "black" }}>
                            Username
                        </label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                value={this.state.usernameInput} onChange={this.handleUsernameChange}
                            />
                        </div>

                        <label for="password" className="form-label" style={{ color: "black" }}>
                            Password
                        </label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={this.state.passwordInput} onChange={this.handlePasswordChange}
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

                                <label className="form-check-label" for="inlineRadio1" style={{ color: "black" }}>
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

                                <label className="form-check-label" for="inlineRadio2" style={{ color: "black" }}>
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
                            <Button variant="warning" style={{ color: "black" }} onClick={() => this.registerUser()}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.showModal}
                    onHide={() => this.changeModalState(false)}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thanks! your account has been successfully created.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please check your inbox to view the code that was sent
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.changeModalState(false)}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default Register;